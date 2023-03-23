import React, { useState, useEffect } from "react";
import TrackingPageView from "../ordertracking/TrackingPageView";
import { useRouter } from "next/router";
import useTracking from "@/lib/hooks/useTracking";
import { Tracking } from "@/models/tracking.model";
interface IProp {
  close: () => void;
  // confirm: (value: string) => void;
  // total?: string[];
  // orderId?:string
  // update: () => Promise<any>;
}

const PackageTrackingModal = (props: IProp) => {
  const router = useRouter();

  const { tracking, trackingIsLoading } = useTracking({
    maz_id: router.query.id as string,
  });
  console.log(tracking);

  const [packageStatus, setPackageStatus] = useState(0);

  useEffect(() => {
    // console.log(tracking);
    if (tracking !== undefined) {
      let sorted = [...(tracking as Tracking[])];
      sorted.sort((a: any, b: any) => a?.stage - b?.stage);
      let latest = sorted.pop();
      if (latest) {
        setPackageStatus(latest.stage);
      }
    }
  }, [tracking]);

  return (
    <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
      <div className="bg-[#FFFFFF] p-[40px] rounded-[10px] ">
        <TrackingPageView packageStatus={packageStatus} />
        <div className="flex-type1 space-x-[10px] mt-[5px] ">
          <button
            className="box-border w-[120px] h-[42px] border-[1px] border-[#8794AD] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#030303] text-center "
            onClick={() => props.close()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageTrackingModal;
