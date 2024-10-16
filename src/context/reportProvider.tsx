"use client";
import { createContext, useState, useContext, useEffect } from "react";

const ReportContext = createContext("report");

export const useReport = () => useContext(ReportContext);

export const ReportProvider = ({ children }: any) => {
  const [reportAirport, setReportAirport] = useState([]);
  const [reportNearbyPlanes, setReportNearbyPlanes] = useState([]);
  const [reportCollision, setReportCollision] = useState([]);
  const [typeOfReport, setTypeOfReport] = useState();

  return (
    <ReportContext.Provider
      value={{
        typeOfReport,
        setTypeOfReport,
        reportAirport,
        setReportAirport,
        reportNearbyPlanes,
        setReportNearbyPlanes,
        reportCollision,
        setReportCollision,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
