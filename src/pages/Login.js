import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveEmail from '../actions/user';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChangeEmail = ({ target }) => {
    const { value } = target;
    this.setState({
      email: value,
    }, this.validateButton);
  }

  handleChangePass = ({ target }) => {
    const { value } = target;
    this.setState({
      password: value,
    }, this.validateButton);
  }

  validateButton = () => {
    /* console.log('entrou'); */
    const { email, password } = this.state;
    const MIN_LENGTH = 6;

    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const emailValid = regex.test(email);
    // aqui faço o uso do regex, uma expressão regular ou string de texto especial, para fazer validação dos caracteres do e-mail, aprendi ao fazer o projeto Trivia com o Francisco do meu grupo

    if (password.length >= MIN_LENGTH && emailValid) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleClick = () => {
    const { email } = this.state;
    const { history, saveEmailDispatch } = this.props;

    saveEmailDispatch(email);
    // essa função está sendo lançada como uma props, por conta da estrutura usada lá embaixo não é necessário usar o dispatch, o email tá sendo enviando como parâmetro
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;

    return (
      <>
        <h3>Login</h3>
        <section>
          <label htmlFor="email">
            <input
              type="text"
              placeholder="Digite o seu e-mail"
              id="email"
              value={ email }
              onChange={ this.handleChangeEmail }
              data-testid="email-input"
            />
          </label>
        </section>
        <section>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Digite a sua senha"
              id="password"
              value={ password }
              onChange={ this.handleChangePass }
              data-testid="password-input"
            />
          </label>
        </section>
        <section>
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </section>
      </>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  saveEmailDispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveEmailDispatch: (email) => dispatch(saveEmail(email)),
});

// apesar do email estar indo para o estado faltava o mapDTP, erro visto com ajuda da Yasmim Matos

export default connect(null, mapDispatchToProps)(Login);
