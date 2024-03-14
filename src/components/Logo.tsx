import { Link } from "react-router-dom"

import logoImg from '../assets/images/logo.svg'

type LogoProps = {
    height: number
}

export function Logo(props: LogoProps) {
    return (
        <Link className="logo" to={'/'}>
            <img src={logoImg} height={props.height} alt="Letmeask" />
        </Link>
    );
}