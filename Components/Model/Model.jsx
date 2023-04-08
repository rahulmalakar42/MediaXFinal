import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Model.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Loader } from "../../Components/index";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import PersonIcon from '@material-ui/icons/Person';
import TelegramIcon from '@material-ui/icons/Telegram';
import CancelIcon from '@material-ui/icons/HighlightOff';

const Model = ({
  openBox,
  title,
  address,
  head,
  info,
  smallInfo,
  image,
  functionName,
}) => {
  //USESTATE
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState(address);
  const { loading, setLoading, router } = useContext(ChatAppContext);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  async function handleSubmit({ name, accountAddress }) {
    setLoading(true);
    await functionName({ name, accountAddress });
    setLoading(false);
  }

  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title} <span style={{ paddingTop: "10px" }}>{head}</span>
          </h1>
          <p>{info}</p>
          {/* <small>{smallInfo}</small> */}

          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.Model_box_right_name}>
              <div className={Style.Model_box_right_name_info}>
                <PersonIcon />
                <input
                  type="text"
                  required={true}
                  placeholder="Name..."
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={Style.Model_box_right_name_info}>
                <AccountBalanceWalletIcon style={{ color: "#fff" }} />
                <input
                  type="text"
                  placeholder={address || "Address.."}
                  readOnly={true}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>

              <div className={Style.Model_box_right_name_btn}>
                <button onClick={() => handleSubmit({ name, accountAddress })}>
                  {""}
                  <TelegramIcon />
                  {""}
                  Submit
                </button>

                <button onClick={() => router.push("/")}>
                  {""}
                  <CancelIcon/>
                  {""}
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
