"use client";
import { ContainerPanel } from "@/components";
import { useData } from "@/context/dataProvider";
import { useSelectedItems } from "@/context/selectedItemsProvider";
import { useState } from "react";

export default function DataGrid() {
  const { checkedItems, setCheckedItems } = useSelectedItems();
  const { dataAirplane } = useData();

  const handleCheckboxChange = (id) => {
    if (checkedItems.includes(id)) {
      setCheckedItems((prevState) => prevState.filter((item) => item !== id));
    } else {
      setCheckedItems((prevState) => [...prevState, id]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Lista de aviões</h1>
      <ContainerPanel>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Selecione</th>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">X</th>
                <th className="px-4 py-2 border-b">Y</th>
                <th className="px-4 py-2 border-b">R</th>
                <th className="px-4 py-2 border-b">A</th>
                <th className="px-4 py-2 border-b">V (km/h)</th>
                <th className="px-4 py-2 border-b">D</th>
              </tr>
            </thead>
            <tbody>
              {dataAirplane.map(
                (item, index) =>
                  index > 0 && (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={checkedItems.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </td>
                      <td
                        className={
                          "px-4 py-2 flex justify-center items-center gap-2 "
                        }
                      >
                        <div
                          style={{
                            height: "15px",
                            width: "15px",
                            borderRadius: "50%",
                            backgroundColor: item.color,
                          }}
                        />
                        {item.id}
                      </td>
                      <td className="px-4 py-2">{item.x.toFixed(2)}</td>
                      <td className="px-4 py-2">{item.y.toFixed(2)}</td>
                      <td className="px-4 py-2">{item.radius.toFixed(2)}</td>
                      <td className="px-4 py-2">{item.angle.toFixed(2)}</td>
                      <td className="px-4 py-2">{item.speed}</td>
                      <td className="px-4 py-2">{item.direction}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </ContainerPanel>
    </div>
  );
}
