import { useState, useEffect, useRef } from "react";
import visaImg from "../images/visa.png";
import amexImg from "../images/amex.png";
import masterCard from "../images/mastercard.png";
import chipImg from "../images/chip.png";

function CardForm() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("Visa");
  const [isCvvVisible, setIsCvvVisible] = useState(false);
  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const cvvRef = useRef(null);

  useEffect(() => {
    console.log(number);
    console.log(name);
    currentCardType(number);
  }, [number, name]);

  function handleYearChange(e) {
    setYear(e.target.value);
  }

  function handleCvvFocused() {
    setIsCvvFocused(!isCvvFocused);
  }

  function handleMonthChange(e) {
    setMonth(e.target.value);
  }

  function handleCvvToggleClick() {
    setIsCvvVisible(!isCvvVisible);
  }

  function handelCvvMouseDown(e) {
    e.preventDefault();
    cvvRef.current.focus();
  }

  function handleButtonClick(e) {
    e.preventDefault();
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleCvvChange(e) {
    setCvv(e.target.value);
  }

  function currentCardType(number) {
    if (/^5[1-5]/.test(number) || /^2(2[2-9]|[3-7][0-9])/.test(number)) {
      setCardType("MasterCard");
    } else if (/^3[47]/.test(number)) {
      setCardType("American Express");
    } else {
      setCardType("Visa");
    }
  }

  function getCardImage() {
    switch (cardType) {
      case "MasterCard":
        return masterCard;
      case "American Express":
        return amexImg;
      default:
        return visaImg; // Картинка для неизвестного типа
    }
  }

  function isNumber(span) {
    if ((span >= "0" && span <= "9") || span === "" || span === " ") {
      return true;
    }
    return false;
  }

  function handleChange(e) {
    let strName = e.target.value;
    let span = strName ? strName[strName.length - 1] : "";
    if (isNumber(span)) {
      setNumber(strName.replace(/\s+/g, "").trim());
    }
  }

  return (
    <div className="form__box">
      <div className="form__card">
        <div
          className={`form__card_front ${
            isCvvFocused ? "card-front_turned" : ""
          }`}
        >
          <div className="form__card-top">
            <img
              src={chipImg}
              alt="card chip"
              className="form__card-chip"
            ></img>
            <img
              src={getCardImage()}
              alt="bank logo"
              className={`form__card-bank ${
                cardType === "MasterCard" ? "form__card-bank_mc" : ""
              }`}
            ></img>
          </div>
          <div className="form__card-number">
            <div>
              <span className="form__card-digit">
                {number[0] ? number[0] : "#"}
              </span>
              <span className="form__card-digit">
                {number[1] ? number[1] : "#"}
              </span>
              <span className="form__card-digit">
                {number[2] ? number[2] : "#"}
              </span>
              <span className="form__card-digit">
                {number[3] ? number[3] : "#"}
              </span>
            </div>

            <div>
              <span className="form__card-digit">
                {number[4] ? number[4] : "#"}
              </span>
              <span className="form__card-digit">
                {number[5] ? number[5] : "#"}
              </span>
              <span className="form__card-digit">
                {number[6] ? number[6] : "#"}
              </span>
              <span className="form__card-digit">
                {number[7] ? number[7] : "#"}
              </span>
            </div>

            <div>
              <span className="form__card-digit">
                {number[8] ? number[8] : "#"}
              </span>
              <span className="form__card-digit">
                {number[9] ? number[9] : "#"}
              </span>
              <span className="form__card-digit">
                {number[10] ? number[10] : "#"}
              </span>
              <span className="form__card-digit">
                {number[11] ? number[11] : "#"}
              </span>
            </div>

            <div>
              <span className="form__card-digit">
                {number[12] ? number[12] : "#"}
              </span>
              <span className="form__card-digit">
                {number[13] ? number[13] : "#"}
              </span>
              <span className="form__card-digit">
                {number[14] ? number[14] : "#"}
              </span>
              <span className="form__card-digit">
                {number[15] ? number[15] : "#"}
              </span>
            </div>
          </div>
          <div className="form__card-content">
            <div className="form__card-info">
              <span className="form__card-span">Card Holder</span>
              <p className="form__card-name">
                {name ? name.toUpperCase() : "FULL NAME"}
              </p>
            </div>
            <div className="form__card-info">
              <span className="form__card-span">Expires</span>
              <p className="form__card-expdate">{`${month ? month : "MM"}/${
                year ? year : "YY"
              }`}</p>
            </div>
          </div>
        </div>
        <div
          className={`form__card_back ${
            isCvvFocused ? "card-back_turned" : ""
          }`}
        >
          <div className="form__card-swipeline"></div>
          <div className="form__card-cvvbox">
            <span className="form__card-cvvspan">CVV</span>
            <div className="form__card-cvvband">
              {isCvvVisible ? cvv : cvv.replace(/./g, "*")}
            </div>
          </div>
          <div className="form__card-footer">
            <img
              src={getCardImage()}
              alt="bank logo"
              className={`form__card-bank ${
                cardType === "MasterCard" ? "form__card-bank_mc" : ""
              }`}
            />
          </div>
        </div>
      </div>
      <form className="form__grid">
        <div className="form__number">
          <label htmlFor="number" className="form__label">
            Card Number
          </label>
          <input
            id="number"
            maxLength="19"
            type="text"
            onChange={handleChange}
            value={number.replace(/(.{4})/g, "$1 ").trim()}
          />
        </div>
        <div className="form__name">
          <label htmlFor="name" className="form__label">
            Card Holder
          </label>
          <input type="text" id="name" onChange={handleNameChange} />
        </div>
        <div className="form__month">
          <label className="form__label">Expiration Date</label>
          <select onChange={handleMonthChange} className="form__select">
            <option value="" selected disabled>
              Month
            </option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <select onChange={handleYearChange} className="form__select">
          <option value="" selected disabled>
            Year
          </option>
          <option value="24">2024</option>
          <option value="25">2025</option>
          <option value="26">2026</option>
          <option value="27">2027</option>
          <option value="28">2028</option>
          <option value="29">2029</option>
          <option value="30">2030</option>
          <option value="31">2031</option>
          <option value="32">2032</option>
          <option value="33">2033</option>
          <option value="34">2034</option>
          <option value="35">2035</option>
        </select>
        <div className="form__cvv">
          <label className="form__label" htmlFor="cvv">
            CVV
          </label>
          <label
            className="form__password"
            onClick={handleCvvToggleClick}
            onMouseDown={handelCvvMouseDown}
            htmlFor="cvv"
          ></label>
          <input
            type={isCvvVisible ? "text" : "password"}
            maxLength="4"
            onFocus={handleCvvFocused}
            onBlur={handleCvvFocused}
            onChange={handleCvvChange}
            id="cvv"
            ref={cvvRef}
          />
        </div>
        <button className="form__button" onClick={handleButtonClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export { CardForm };
