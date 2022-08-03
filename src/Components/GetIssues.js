import { useState, useEffect } from "react";
import axios from "axios";

export const GetIssues = () => {
  const [arr, setArr] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://api.github.com/repos/PHP-FFMpeg/PHP-FFMpeg/issues")
      .then((response) => {
        setArr(response.data);
      });
  }, []);
  return (
    <>
      <h1 className="text-center text-4xl mt-10">Search the Issue</h1>

      <div className="container mx-auto my-10 px-60">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-3 pl-2">
              <div className="relative max-w-xs ">
                <input
                  type="text"
                  placeholder="Issue...."
                  className=" m-auto inline-flex flex-col place-content-center max-w-2xl p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>

            <div className="p-1.5 w-full inline-block align-middle ">
              <div className="overflow-hidden border rounded-lg ">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    {arr.length > 0 && (
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          id
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Issue Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          DateCreated
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          State
                        </th>
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {arr.length > 0 &&
                      arr
                        .filter((item) => {
                          if (query === "") {
                            return item;
                          } else if (
                            item.title
                              .toLowerCase()
                              .includes(query.toLowerCase())
                          )
                            return item;
                        })
                        .map((item, key) => (
                          <tr key={key}>
                            <td className="px-6 py-4 text-sm text-gray-800 ">
                              {item.id}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 ">
                              {item.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 ">
                              {item.created_at}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 ">
                              {item.state}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
