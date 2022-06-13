import { useEffect, useState } from "react";
import { PasswordField, TextField } from "../Form/Inputbox";
import { VscError } from "react-icons/vsc";
import API from "../../api/axios";
import { DATASRC_UPDATE, DATASRC_URL } from "../../api/endpoints";

const DataSourceCreate = ({ params, close }) => {
  const [connectionName, setConnectionName] = useState(
    params.name ? params.name : ""
  );
  const [type, setType] = useState(params.type ? params.type : "POSTGRESQL");
  const [host, setHost] = useState(params.db_host ? params.db_host : "");
  const [port, setPort] = useState(params.db_port ? params.db_port : "");
  const [user, setUser] = useState(
    params.db_username ? params.db_username : ""
  );
  const [password, setPassword] = useState(
    params.db_password ? params.db_password : ""
  );
  const [database, setDatabase] = useState(
    params.db_name ? params.db_name : ""
  );

  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(false);
    setErrorList([]);

    if (params.create) {
      API.post(DATASRC_URL, {
        type: type,
        name: connectionName,
        db_host: host,
        db_port: port,
        db_name: database,
        db_user: user,
        db_password: password,
      })
        .then((res) => {
          setError(false);
          setErrorList([]);
          close(false);
        })
        .catch((err) => {
          const response = err?.response;
          const data = response?.data;
          const errors = data?.errors;
          setError(true);
          setErrorList(errors.map((value) => value.msg));
        });
    } else {
      API.put(DATASRC_UPDATE.replace(":id", params.id), {
        type: type,
        name: connectionName,
        db_host: host,
        db_port: port,
        db_name: database,
        db_user: user,
        db_password: password,
      })
        .then((res) => {
          setError(false);
          setErrorList([]);
          close(false);
        })
        .catch((err) => {
          const response = err?.response;
          const data = response?.data;
          const errors = data?.errors;
          setError(true);
          setErrorList(errors.map((value) => value.msg));
        });
    }
  };

  return (
    <div className="data-source-create">
      <form action="" className="flex flex-col space-y-5">
        <TextField
          text="Name"
          placeholder="Local Postgresql server"
          type="text"
          valueState={[connectionName, setConnectionName]}
          error={error}
        />
        <TextField
          text="Host"
          placeholder="127.0.0.1"
          type="text"
          valueState={[host, setHost]}
          error={error}
        />
        <TextField
          text="Port"
          placeholder="5432"
          type="text"
          valueState={[port, setPort]}
          error={error}
        />
        <TextField
          text="User"
          placeholder="postgres"
          type="text"
          valueState={[user, setUser]}
          error={error}
        />
        <PasswordField
          text="Password"
          placeholder="postgres"
          valueState={[password, setPassword]}
          error={error}
        />
        <TextField
          text="Database Name"
          placeholder="postgres"
          type="text"
          valueState={[database, setDatabase]}
          error={error}
        />
        {params.create ? (
          <button
            className="px-3 py-2 bg-bluz text-white"
            onClick={handleSubmit}
          >
            Create
          </button>
        ) : (
          <button
            className="px-3 py-2 bg-bluz text-white"
            onClick={handleSubmit}
          >
            Update
          </button>
        )}
      </form>
      <div className="mt-6">
        {error &&
          errorList.map((value, index) => (
            <div
              key={index}
              className="mt-2 flex flex-row space-x-2 items-center"
            >
              <VscError className="text-pinkz-500"></VscError>
              <p className="font-robo text-sm text-pinkz-500">{value}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DataSourceCreate;
