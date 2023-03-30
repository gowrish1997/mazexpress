import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IProp {
 
 row:any,
 close:()=>void

}

const schema = yup
    .object({
        subject: yup.string().required("subject is required field"),
        message: yup.string().required("message 01 is required field"),
    })
    .required();
const EnquiryReplyModal = (props:IProp) => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<any> = async (data) => {
        console.log(data);
    };

    return (
        <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
            <div className="bg-[#FFFFFF] rounded-[4px] p-[20px] w-[600px] flex flex-col justify-start items-start gap-y-[10px] ">
                <div className="w-full space-y-[5px] ">
                    <p className="text-[14px] text-[#707070] font-[400] leading-[19px]  ">
                        User enquiry
                    </p>
                    <div className="border-[1px] border-[#BBC2CF] p-[15px] rounded-[4px] text-[14px] text-[#2B2B2B] font-[600] leading-[20px] mt-[15px] ">
                        hi i have some qursion please reply to this hi i have
                        some qursion please reply to this hi i have some qursion
                        please reply to this
                    </div>
                </div>
                <p className="text-[18px] text-[#2B2B2B] font-[600] leading-[19px] mt-[15px]  ">
                    Create Replay Email
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-[5px] flex flex-col justify-start items-start gap-y-[10px] w-full"
                >
                    <div>
                        <input
                            id="title"
                            type="string"
                            {...register("subject")}
                            className="w-full h-[46px] text-[18px] text-[#35C6F4] font-[700] leading-[25px] focus:outline-none"
                            placeholder="Email Subject"
                        />
                        {errors.subject?.message && (
                            <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">sdf</p>
                        )}
                    </div>

                    <div className={"w-full flex-type6"}>
                        <label
                            htmlFor="Message"
                            className="text-[14px] text-[#707070] font-[400] leading-[19px]  mb-[5px] "
                        >
                            Describe Message
                        </label>
                        <div
                            className={
                                "flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] box-border h-[100px] relative" +
                                " "
                            }
                        >
                            <textarea
                                className="w-full h-full px-[5px] rounded-[5px] focus:outline-none text-[14px] text-[#2B2B2B] font-[600] leading-[19px] resize-none p-[5px]"
                                {...register("message")}
                                name="message"
                            ></textarea>
                        </div>
                        {errors.message?.message && (
                            <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">asd</p>
                        )}
                    </div>
                    <div className="mt-[10px] space-x-[5px] ">
                        <button className="border-[1px] bg-[#35c6f4] py-[10px] px-[15px] rounded-[6px] text-[14px] text-[#FFFFFF] font-[600] " type="submit">
                            Submit
                        </button>
                        <button className="border-[1px] border-[#BBC2CF] py-[10px] px-[15px] rounded-[6px]" onClick={props.close}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnquiryReplyModal;
