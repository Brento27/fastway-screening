import React from "react";
import { motion } from "framer-motion";
import { ScannedWaybillDataCard } from "./ScannedWaybillDataCard";
import { type ParcelData } from "@/Types/Parcel";

const ParcelDataCardList = ({
  data,
  waybill,
}: {
  data: ParcelData[] | undefined;
  waybill: string;
}) => {
  return (
    <>
      <h2 className={`text-2xl font-bold text-white ${data ? "" : "hidden"}`}>
        Result for {waybill}
      </h2>
      {data?.map((scan, i) => {
        return (
          <div key={i}>
            <motion.div
              key={i}
              initial={{ opacity: 0, translateX: -150 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.3, delay: i * 0.2 }}
            >
              <ScannedWaybillDataCard
                key={i}
                scanType={scan.Type}
                date={scan.Date}
                description={scan.StatusDescription}
                location={scan.Name}
              />
            </motion.div>
          </div>
        );
      })}
    </>
  );
};

export default ParcelDataCardList;
