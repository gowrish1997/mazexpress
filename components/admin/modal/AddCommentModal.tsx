import React, { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IProp {
    show: boolean;
    close: () => void;
    confirm: (value: string) => void;
    total?: string[];
    // update: () => Promise<any>;
}

const CommentModal = (props: IProp) => {
    const [error, setError] = useState<boolean>(false);
    const [comment, setCommnent] = useState<string>("");

    const commentHandler = () => {
        if (comment) {
            props.confirm(comment);
            props.close();
        } else {
            setError(true);
        }
    };

    const textAreaOnchangeHandler = (event: SyntheticEvent) => {
        setError(false);
        setCommnent((event.target as HTMLTextAreaElement).value);
    };

    return (
        <>
            {props.show && (
                <div className="box-border fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] z-50 flex flex-row justify-center items-center">
                    <div className=" box-border flex-type6 bg-[#ffffff] rounded-[8px] py-[30px] px-[25px] w-[600px] space-y-[10px]">
                        <p className="text-[18px] text-[#2B2B2B] font-[700] leading-[25px] mb-2">Send Comment</p>

                        <div className="w-full">
                            {/* <UserSelect update={updateSelectedUsers} /> */}
                            <div className="border border-[#BBC2CF] rounded flex items-center justify-start ">
                                <input
                                    type={"text"}
                                    className="focus:outline-0 px-2 py-2 rounded h-[45px]"
                                    style={props.total && props.total.length >1 ? { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" } : {}}
                                    value={props.total && props.total[0]}
                                    // onChange={fetchMatchingUsers}
                                    //   onFocus={openDropdown}
                                    //   onBlur={closeDropdown}
                                    //   onClick={openDropdown}
                                    // ref={inputRef}
                                />
                                {props.total && props.total?.length > 1 && <span className="text-[#3672DF] text-[14px]">{`${props.total.length - 1}+more`}</span>}
                            </div>
                        </div>

                        <div className={"w-full"}>
                            <label htmlFor={"content_notifications"} className="text-[14px] text-[#707070] font-[400] leading-[19px] mb-[5px] ">
                                Describe Message
                            </label>
                            <div
                                className={"flex-type1 w-full border-[1px] border-[#BBC2CF] rounded-[4px] relative h-[300px] overflow-y-scroll"}
                                // style={{ borderColor: props.error ? "#f02849" : "" }}
                            >
                                <textarea
                                    id="content_notifications"
                                    rows={30}
                                    value={comment}
                                    onChange={textAreaOnchangeHandler}
                                    className="rounded-[5px] focus:outline-none top-0 absolute p-4 w-full"
                                    name={"content_notifications"}
                                />
                            </div>
                        </div>
                        {error && <p className="text-[12px] text-[#f02849] mb-[-10px] leading-[16px]">Please add some comment</p>}

                        <div className="flex-type1 space-x-[10px] mt-[5px] ">
                            <button className="text-[#FFFFFF] text-[14px] leading-[21px] font-[500] bg-[#3672DF] rounded-[4px] p-[10px]" onClick={commentHandler}>
                                Send Comment
                            </button>
                            <button
                                className="box-border w-[120px] h-[42px] border-[1px] border-[#ececec] rounded-[4px] font-[400] text-[14px] leading-[19px] text-[#030303] text-center "
                                onClick={() => props.close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentModal;
