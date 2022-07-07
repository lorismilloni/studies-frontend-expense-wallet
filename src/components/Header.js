import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// esse requisito foi feito com a ajuda da Yasmim Matos

class Header extends React.Component {
  render() {
    const {
      email,
      wallet: { expenses },
    } = this.props;

    return (
      <header>
        <h5>
          <p data-testid="email-field">{ `E-mail do usuário ${email}` }</p>
        </h5>
        <h5>
          Saldo total:
          <p data-testid="total-field">
            { expenses
              .reduce((acc, { exchangeRates, currency, value }) => (
                acc + ((exchangeRates[currency].ask) * value)), 0) }
          </p>
        </h5>
        <h5>
          Câmbio atual:
          <p data-testid="header-currency-field">BRL</p>
        </h5>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.obj),
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
});

export default connect(mapStateToProps, null)(Header);
