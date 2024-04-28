import {useContext, useState, useEffect} from 'react'
import {ColorContext} from '../providers/ColorProvider.jsx';
import {AuthContext} from '../providers/AuthProvider.jsx';
import {Logo} from './Logo.jsx';
import { ColorForm } from './ColorForm.jsx';
import FetchService from '../services/FetchService.js';
import InterceptorService from '../services/InterceptorService.js'
import ColorService from '../services/ColorService.js';
import ValidationService from '../services/ValidationService.js';
import { AuthForm } from './AuthForm.jsx';
import { ColorButton } from './ColorButton.jsx';

export function Header() {
    const {color, setColor} = useContext(ColorContext);
    const {authStatus, setAuthStatus} = useContext(AuthContext);
    const [hoverStatus, setHoverStatus] = useState(false);
    const [popupRegStatus, setPopupRegStatus] = useState(false);
    const [popupLoginStatus, setPopupLoginStatus] = useState(false);
    const [isRendered, setIsRendered] = useState(false);


    const onMouseEnterHandler = () => {
        setHoverStatus(true);
    };
    const onMouseLeaveHandler = () => {
        setHoverStatus(false);
    };
    const onExitHandler = () => {
      localStorage.setItem("authStatus", "false");
      setAuthStatus(false);
    };

    useEffect(() => {
      async function checkAuth() {
        if (localStorage.getItem("authStatus") === "true") {
          if ((await InterceptorService.authInterceptor(FetchService.checkAuth)).status) {
            setAuthStatus(true);
          } else {
            localStorage.setItem("authStatus", "false");
          }
        } 

        setIsRendered(true);
      }
      checkAuth();
    }, []);

  return (
    <header 
      className="header"
      style={{borderBottom: ColorService.getBorderBottom(color.color, 3)}}
    >
      <div className="content">
        <div className="header__container">
          <div 
            className="header__logo"
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
          >
            <Logo hoverStatus={hoverStatus}/>
          </div>
          <div className="header__right">
          {isRendered && 
            <><ColorForm></ColorForm>
            {!authStatus 
                ?
                  <>
                    <ColorButton
                      className="header__color-button"
                      type="button"
                      onClick={() => {setPopupRegStatus(true)}}
                    >
                      Регистрация
                    </ColorButton>
                    <AuthForm
                      title="Регистрация"
                      popupStatus={popupRegStatus}
                      setPopupStatus={setPopupRegStatus}
                      inputsData={[
                        {name: 'email', type: 'email', label: 'Email'},
                        {name: 'nick', type: 'text', label: 'Никнейм'},
                        {name: 'pass', type: 'password', label: 'Пароль'},
                        {name: 'rpass', type: 'password', label: 'Повторите пароль'},
                        {name: 'code', type: 'text', label: 'Код приглашения'}
                    ]}
                      fetchCallback={FetchService.reg}
                      validationCallback={ValidationService.regValidation}
                    ></AuthForm>
                    <button 
                      className="header__login  text-active"
                      onClick={() => {setPopupLoginStatus(true)}}
                    >Вход</button>
                    <AuthForm
                      title="Авторизация"
                      popupStatus={popupLoginStatus}
                      setPopupStatus={setPopupLoginStatus}
                      inputsData={[
                        {name: 'nick', type: 'text', label: 'Никнейм'},
                        {name: 'pass', type: 'password', label: 'Пароль'},
                    ]}
                      fetchCallback={FetchService.login}
                      validationCallback={ValidationService.loginValidation}
                    ></AuthForm>
                  </>
                :
                  <ColorButton
                    className="header__color-button-exit"
                    type="button"
                    onClick={onExitHandler}
                  >
                    Выход
                  </ColorButton>
                }</>
              }

          </div>
        </div>
      </div>
    </header>
  )
}