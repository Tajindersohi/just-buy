import React from 'react';
import OTPInput from './OtpInput';

function OtpExample() {
  const [{ otp, numInputs, separator, minLength, maxLength, placeholder, inputType }, setConfig] = React.useState({
    otp: '',
    numInputs: 4,
    separator: '-',
    minLength: 0,
    maxLength: 40,
    placeholder: '',
    inputType: 'text',
  });

  const handleOTPChange = (otp) => {
    setConfig((prevConfig) => ({ ...prevConfig, otp }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConfig((prevConfig) => ({ ...prevConfig, [name]: value }));
  };

  const handleNumInputsChange = (event) => {
    let numInputs = event.target.valueAsNumber;

    if (numInputs < minLength || numInputs > maxLength) {
      numInputs = 4;

      console.error(`Please enter a value between ${minLength} and ${maxLength}`);
    }

    setConfig((prevConfig) => ({ ...prevConfig, numInputs }));
  };

  const clearOtp = () => {
    setConfig((prevConfig) => ({ ...prevConfig, otp: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(otp);
  };

  return (
    <div className="container">
      <div className="side-bar">
        <a href="https://github.com/devfolioco/react-otp-input" target="_blank" rel="noreferrer">
          <div className="side-bar__segment side-bar__segment--header">
            <h2>react-otp-input</h2>
          </div>
        </a>
        <div className="side-bar__segment">
          <label htmlFor="num-inputs">
            numInputs
            <input
              id="num-inputs"
              name="numInputs"
              type="number"
              value={numInputs}
              onChange={handleNumInputsChange}
              min={minLength}
              max={maxLength}
            />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="separator">
            separator
            <input
              id="separator"
              maxLength={1}
              name="separator"
              type="text"
              value={separator}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="value">
            value
            <input id="value" maxLength={numInputs} name="otp" type="text" value={otp} onChange={handleChange} />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="placeholder">
            placeholder
            <input id="placeholder" name="placeholder" type="text" value={placeholder} onChange={handleChange} />
          </label>
        </div>
        <div className="side-bar__segment">
          <label htmlFor="inputType">inputType</label>
          <select id="inputType" name="inputType" value={inputType} onChange={handleChange}>
            <option value="text">text</option>
            <option value="number">number</option>
            <option value="password">password</option>
            <option value="tel">tel</option>
          </select>
        </div>
        <div className="side-bar__segment side-bar__segment--bottom">
          <a href="https://github.com/devfolioco/react-otp-input">Documentation and Source</a>
        </div>
      </div>
      <div className="view">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <p>Enter verification code</p>
            <div className="margin-top--small">
              <OTPInput
                inputStyle="inputStyle"
                numInputs={numInputs}
                onChange={handleOTPChange}
                renderSeparator={<span>{separator}</span>}
                value={otp}
                placeholder={placeholder}
                inputType={inputType}
                renderInput={(props) => <input {...props} />}
                shouldAutoFocus
              />
            </div>
            <div className="btn-row">
              <button className="btn margin-top--large" type="button" disabled={otp.trim() === ''} onClick={clearOtp}>
                Clear
              </button>
              <button className="btn margin-top--large" disabled={otp.length < numInputs}>
                Get OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpExample;