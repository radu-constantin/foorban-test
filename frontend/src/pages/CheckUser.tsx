import { useEffect, useState } from "react";
import { BaseResponse, ValidateUserRequest } from "../interfaces";

export function CheckUser() {
  const [status, setStatus] = useState<
    | "INITIAL"
    | "SEND_DATA"
    | "SENDING_DATA"
    | "DATA_SENDED"
    | "ERROR_SENDING_DATA"
  >();
  const [userData, setUserData] = useState<ValidateUserRequest>({
    name: "",
    age: "",
    married: "",
    dob: "",
  });
  const [data, setData] = useState<BaseResponse>();

  function resetUserData() {
    setUserData({
      name: "",
      age: "",
      married: "",
      dob: "",
    });
  }

  function convertStringToBoolean(string: string) {
    if (string === "true") {
      return true;
    } else if (string === "false") {
      return false;
    } else {
      return undefined;
    }
  }

  function extractMessagesFromResponse(response: BaseResponse) {
    const errors = response.errors;
    const messages = errors?.map((error) =>
      error.constraints ? Object.values(error.constraints).slice(-1) : null
    );
    return messages?.flat();
  }

  useEffect(() => {
    if (status === "SEND_DATA") {
      setStatus("SENDING_DATA");
      fetch("http://localhost:3001/info/validateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((rawResponse) => {
          if ([200, 201].includes(rawResponse.status)) {
            return rawResponse.json();
          } else {
            throw new Error();
          }
        })
        .then((response: BaseResponse) => {
          setStatus("DATA_SENDED");
          setData(response);
        })
        .catch((e) => {
          setStatus("ERROR_SENDING_DATA");
        });
    }
  }, [status, userData]);

  if (status === "ERROR_SENDING_DATA") {
    console.log(data && extractMessagesFromResponse(data));
    return (
      <div>
        <h1>ERRORE INVIO DATI</h1>
        <button onClick={() => setStatus("INITIAL")}>RIPROVA</button>
      </div>
    );
  }

  if (status === "SEND_DATA" || status === "SENDING_DATA") {
    return (
      <div>
        <h1>INVIO IN CORSO</h1>
        <button onClick={() => setStatus("INITIAL")}>ANNULLA</button>
      </div>
    );
  }

  if (status === "DATA_SENDED") {
    const messages = data
      ? extractMessagesFromResponse(data)?.map((message) => <p>{message}</p>)
      : null;
    return (
      <div>
        {data?.success === true && <h1>DATI INVIATI VALIDI</h1>}
        {data?.success === false && (
          <>
            <h1>DATI INVIATI NON VALIDI</h1>
            {messages}
          </>
        )}
        <button
          onClick={() => {
            setStatus("INITIAL");
            resetUserData();
          }}
        >
          INVIA UN ALTRO VALORE
        </button>
      </div>
    );
  }

  return (
    <form style={form as React.CSSProperties}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => {
            setUserData({
              ...userData,
              name: e.target.value,
            });
          }}
        ></input>
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          value={userData.age}
          onChange={(e) => {
            setUserData({
              ...userData,
              age: Number(e.target.value),
            });
          }}
        ></input>
      </div>

      <fieldset>
        <legend>Married:</legend>
        <label>False</label>
        <input
          type="radio"
          name="married"
          value="false"
          onChange={(e) => {
            setUserData({
              ...userData,
              married: convertStringToBoolean(e.target.value),
            });
          }}
        ></input>
        <label>True</label>
        <input
          type="radio"
          name="married"
          value="true"
          onChange={(e) => {
            setUserData({
              ...userData,
              married: convertStringToBoolean(e.target.value),
            });
          }}
        ></input>
      </fieldset>
      <label>Date of birth:</label>
      <input
        type="date"
        value={userData.dob}
        onChange={(e) => {
          setUserData({
            ...userData,
            dob: e.target.value,
          });
        }}
      ></input>

      <button onClick={() => setStatus("SEND_DATA")}>VALIDA</button>
    </form>
  );
}

const form = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "40vw",
  border: "1px solid black",
  borderRadius: "10px",
  padding: "20px",
  marginTop: "20px",
  gap: "10px",
};
