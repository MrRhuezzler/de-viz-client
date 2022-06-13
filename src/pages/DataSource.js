import Postgres from "../assests/datasources/postgresql.png";
import {
  VscClose,
  VscChromeClose,
  VscRunAll,
  VscTrash,
  VscPlay,
  VscSettingsGear,
} from "react-icons/vsc";
import { useEffect, useState } from "react";
import API from "../api/axios";
import DataSourceCreate from "../components/DataSource/DataSourceCreate";
import { DATASRC_DELETE, DATASRC_URL } from "../api/endpoints";

const DataSource = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [dataSources, setDataSources] = useState([]);
  const [updateParams, setUpdateParams] = useState({ create: false });

  const updateSources = () => {
    API.get(DATASRC_URL)
      .then((res) => {
        setDataSources(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateSources();
  }, [isCreateOpen, isUpdateOpen]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    API.delete(DATASRC_DELETE.replace(":id", id))
      .then((res) => {
        updateSources();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="data-source h-full">
        <div className="mx-[5%]">
          <div className="flex flex-row items-center mb-5 space-x-3">
            <h1 className="text-2xl">Data Sources</h1>
            <button
              className="p-2 bg-bluz rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                setIsCreateOpen(!isCreateOpen);
              }}
            >
              <VscChromeClose className="rotate-45 text-white text-xl"></VscChromeClose>
            </button>
          </div>
          <div className="flex flex-row justify-center">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-400">
                  <th className="py-3">ID</th>
                  <th>Connection Name</th>
                  <th>Type of Source</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {dataSources.map((dataSource, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                    }`}
                  >
                    <td className="w-44 text-center">{dataSource.id}</td>
                    <td className="text-center">{dataSource.name}</td>
                    <td className="text-center">{dataSource.type}</td>
                    <td>
                      <div className="py-2 flex flex-row items-center space-x-3 justify-center">
                        <button className="p-2 bg-bluz rounded-lg">
                          <VscPlay className="text-white text-xl"></VscPlay>
                        </button>
                        <button
                          className="p-2 bg-green-400 rounded-lg"
                          onClick={(e) => {
                            setUpdateParams({ ...updateParams, ...dataSource });
                            setIsUpdateOpen(!isUpdateOpen);
                          }}
                        >
                          <VscSettingsGear className="text-white text-xl"></VscSettingsGear>
                        </button>
                        <button
                          className="p-2 bg-pinkz-800 rounded-lg"
                          onClick={(e) => {
                            handleDelete(e, dataSource.id);
                          }}
                        >
                          <VscTrash className="text-white text-xl"></VscTrash>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isCreateOpen && (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsCreateOpen(!isCreateOpen);
            }}
            className="absolute h-full w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black opacity-50"
          ></div>
          <div className="absolute p-6 py-8 bg-white w-[500px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg">
            <div className="w-full flex flex-row items-center">
              <h1 className="text-xl">Create a New Data Source</h1>
              <button
                className="ml-auto p-1 bg-pinkz-800 rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCreateOpen(!isCreateOpen);
                }}
              >
                <VscClose className="text-xl text-white"></VscClose>
              </button>
            </div>
            <div className="mt-8">
              <DataSourceCreate
                params={{ create: true }}
                close={setIsCreateOpen}
              ></DataSourceCreate>
            </div>
          </div>
        </>
      )}

      {isUpdateOpen && (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsUpdateOpen(!isUpdateOpen);
            }}
            className="absolute h-full w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black opacity-50"
          ></div>
          <div className="absolute p-6 py-8 bg-white w-[500px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg">
            <div className="w-full flex flex-row items-center">
              <h1 className="text-xl">Update Data Source</h1>
              <button
                className="ml-auto p-1 bg-pinkz-800 rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUpdateOpen(!isUpdateOpen);
                }}
              >
                <VscClose className="text-xl text-white"></VscClose>
              </button>
            </div>
            <div className="mt-8">
              <DataSourceCreate
                params={updateParams}
                close={setIsUpdateOpen}
              ></DataSourceCreate>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DataSource;
