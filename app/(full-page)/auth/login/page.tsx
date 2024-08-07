/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { LoginService } from '@/service/LoginService';
import { Toast } from 'primereact/toast';

const LoginPage = () => {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const loginService = useMemo(() => new LoginService(), []);

    const toast = useRef<Toast>(null);

    const efetuarLogin = () => {
        loginService.login(login, senha).then((response) => {
            console.log('Login realizado com sucesso');
            console.log(response.data.token);

            localStorage.setItem('TOKEN_APLICACAO_FRONTEND', response.data.token);

            router.push('/');
            window.location.reload();
        }).catch(() => {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Login ou senha está incorreto.'
                });
        });
    }

    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Faça seu Login</div>
                        </div>

                        <div>
                            <label htmlFor="login" className="block text-900 text-xl font-medium mb-2">
                                Login
                            </label>
                            <InputText id="login" onChange={(e) => setLogin(e.target.value)}  type="text" placeholder="Digite seu login" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="Senha" className="block text-900 font-medium text-xl mb-2">
                                Senha
                            </label>
                            <Password inputId="Senha" onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua Senha" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                {/* <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div> */}
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }} onClick={() => router.push('/auth/newuser')}>
                                    Sou novo por aqui!
                                </a>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Esqueci minha senha
                                </a>
                            </div>
                            <Button label="Entrar" className="w-full p-3 text-xl" onClick={() => efetuarLogin()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
