import React, {useEffect, useState} from "react";
import {Switch, Route, Redirect, useHistory} from "react-router-dom"
import Header from './Header.js'
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import {apiData} from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CardsContext} from "../contexts/CardContext";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Auth";
import InfoToolTip from "./InfoToolTip";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({
        name: "",
        link: "",
    });
    const [deleteCard, setDeleteCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [isInfoToolOpen, setInfoToolOpen] = useState(false);
    const [successfulReg, setSuccessfulReg] = useState(false);
    const history = useHistory();


    React.useEffect(() => {
        Promise.all([apiData.getUserProfile(), apiData.getInitialCards()])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleDeleteCardClick(card) {
        setDeleteCard(card);
        setIsDeleteCardPopupOpen(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        apiData
            .changeLikes(card._id, isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(e) {
        e.preventDefault();
        apiData
            .deleteCard(deleteCard._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== deleteCard._id));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }


    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setSelectedCard({name: "", link: ""});
        setInfoToolOpen(false);
    }

    function handleUpdateUser(data) {
        apiData
            .setUserProfile(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function handleUpdateAvatar(data) {
        apiData
            .setAvatar(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(newCard) {
        apiData
            .postCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleLogin(password, email){
        auth.login(password, email)
            .then(data => {
                if(data.token){
                    setLoggedIn(true);
                    setEmail(email);
                    localStorage.setItem('token', data.token);
                    history.push('/')
                }
            })
            .catch(err => {
                setSuccessfulReg(false);
                setInfoToolOpen(true);
                console.log(err);
            })
    }

    function handleReg(password, email){
        auth.register(password, email)
            .then(data => {
                if(data.data._id){
                    setSuccessfulReg(true);
                    setInfoToolOpen(true);
                    history.push('/sign-in');
                }
            })
            .catch(err => {
                setSuccessfulReg(false);
                setInfoToolOpen(true);
                console.log(err)
            });
    }

    function handleLogOut(){
        localStorage.removeItem('token');
        setLoggedIn(false);
        setEmail('');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            auth.checkToken(token)
                .then(res => {
                    if (res) {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch(err => console.log(err));
        }
    },[history] )


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={cards}>
                <div>
                    <Header
                    loggedIn={loggedIn}
                    handleLogOut={handleLogOut}
                    email={email}
                    />

                    <Switch>
                        <ProtectedRoute exact path="/"
                                        loggedIn={loggedIn}
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onEditAvatar={handleEditAvatarClick}
                                        onCardClick={handleCardClick}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleDeleteCardClick}
                                        component={Main}
                        />
                        <Route path="/sign-in">
                            <Login handleLogin={handleLogin} />
                        </Route>
                        <Route path="/sign-up">
                            <Register handleReg={handleReg} />
                        </Route>
                        <Route exact path="/sign-in">
                            {loggedIn ? <Redirect to="/" />
                                        : <Redirect to="/sign-in"/>}
                        </Route>
                        <Route path="/react-mesto-auth">
                            {loggedIn ? <Redirect to="/" />
                                : <Redirect to='/sign-up' />}
                        </Route>
                    </Switch>
                    <Footer/>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}/>
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                   onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar}/>
                    <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
                    <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups}
                                     onSubmit={handleCardDelete}></DeleteCardPopup>
                    <InfoToolTip
                        isOpen={isInfoToolOpen}
                        onClose={closeAllPopups}
                        successfulReg={successfulReg}
                        />
                </div>
            </CardsContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
