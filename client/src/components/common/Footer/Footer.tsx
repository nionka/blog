import React from 'react';
import Logo from '../Logo/Logo';
import './footer.scss';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <Logo />
      </div>
      <div className="footer__copy">© 2021 Wide World</div>
    </footer>
  )
}

export default Footer
