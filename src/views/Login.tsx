import {useState} from 'react'
import logo from '../assets/images/logo.svg';
import loginIcon from '../assets/images/mail.svg';
import passwordIcon from '../assets/images/key.svg';
import { PublicInput } from '../components/general/PublicInput';
import { LoginServices  } from '../services/Login.Service';

const loginServices = new LoginServices ();

export const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const doLogin= async () => {
        try {
            setError('');
            if(!login || login.trim().length < 5
                 || !password || password.trim().length < 4){
                  return setError('Favor preencher os campos corretamente.');
                 }

                 setLoading(true);
                 await loginServices.login({login, password});
                 setLoading(false);

        } catch (e:any) {
            console.log('Erro ao efetuar login:', e);
            setLoading(false);
            if(e?.response?.data?.message){
                return setError(e?.response?.data?.message)
            }

            return setError('Erro ao efetuar login, tente novamente');
        }

    }

    return(
        <div className="container-public">
            <img className="logo" src={logo} alt='Logo devameet'/>
            <form>
                 {error && <p className='error'>{error} </p>}   

                <PublicInput
                    icon={loginIcon}
                    alt="Email"
                    name="Email"
                    type="text"
                    modelValue={login}
                    setValue={setLogin}
                />

                <PublicInput
                    icon={passwordIcon}
                    alt='Senha'
                    name='Senha'
                    type='password'
                    modelValue={password}
                    setValue={setPassword}
                />

                <button type='button'
                 onClick={doLogin} 
                 disabled = {loading} 
                 >{loading ? '...Carregando' : 'Login'}
                 </button>

                <div className='link'>
                    <p>Não possui um conta?</p>
                    <a href="" target='_blank'>Faça seu cadastro agora!</a>
                </div>
            </form>

        </div>
    );
    

}