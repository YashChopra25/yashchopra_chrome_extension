import React, { useState } from 'react'
const DialogPrompt = ({ setShowDialogPrompt }) => {
    const [generateText, setGenerateText] = useState<boolean>(false);
    const [proptMessageInputFiled, setproptMessageInputFiled] = useState("")
    const [promptMessagefromUser, setPromptMessagefromUser] = useState<string>("");
    const [showPromptMessageGeneratedByAI, setshowPromptMessageGeneratedByAI] = useState<boolean>(false);
    const [ResponseGenratedByAI, setResponseGenratedByAI] = useState("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.") //adding the initail response of the AI canbe changed if AI is implemented

    const AddToMessageToLInkedMessageBox = () => { //This fucntion will add message to the linkedIn messasge boc
        const messageBox = document.querySelector('.msg-form__contenteditable'); //getting the linkedIn message Box form
        const messagePlaceholder = document.querySelector('.msg-form__placeholder'); //gettting the linkedIn message box placeHolder to manipulate accoriding to the requirement
        const para = document.createElement('p') //creating an new Paragraph element
        para.textContent = ResponseGenratedByAI  //adding text to the paragraph element
        if (messagePlaceholder) { //checking if it is already removed or not (if the user type something in it then it would be undefined,then no purpose to remove it,it casused error in flow control)
            messagePlaceholder.classList.remove('msg-form__placeholder') //after adding the paragrapth removing the placeholder from the messageBox of LinkedIn
        }
        messageBox.replaceChildren(para)  //adding paragraph tag to the messageBox of LinkedIn
        //remove propt after succesfully adding message to the LinkedIn messageBox
        setShowDialogPrompt(false)
    }

    const getPromptMessage = () => {  //when user click to generate the messsage from ui

        //checking the input filed should not be empty
        if (proptMessageInputFiled.trim().length == 0) {
            alert("Enter message to generate");
            return;
        }
        //setting the prompt Messsage of User
        setPromptMessagefromUser(proptMessageInputFiled)
        //empty the prompt MesssageBoxInputFiled
        setproptMessageInputFiled("")
        //make AI request to generate response accordin to the userPrompt
        setshowPromptMessageGeneratedByAI(true)
        //setting it to true to show the UI response to the THe UI(user)
        setGenerateText(true)
    }
    return (
        <div className='bg-[#F9FAFB] w-[444px] flex p-6 gap-7 flex-col shadow-lg rounded-lg'>
            {generateText && (<div className='messages_from_propmt w-full flex flex-col gap-7'>
                <span className='ml-auto p-4 text-2xl bg-[#DFE1E7] text-[#666D80] rounded-lg'>
                    {promptMessagefromUser}
                </span>
                {
                    showPromptMessageGeneratedByAI && <span className='mr-auto p-4 text-2xl bg-[#DBEAFE] text-[#666D80] rounded-lg '>
                        {ResponseGenratedByAI}
                    </span>
                }
            </div>)}

            <div className='prompt_text_filed'>
                <input type="text" id="prompt_input" value={proptMessageInputFiled} className="block w-full p-2 text-2xl text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-black/30 focus:border-black/focus:ring-black/30 focus:outline-none " placeholder='Your prompt' autoComplete='off' onChange={(e) => setproptMessageInputFiled(e.target.value)} autoFocus={true} />
            </div>

            <div className='buttons w-full flex justify-end gap-3'>
                {
                    generateText ? <>
                        <button type="button" className="text-[#666D80] w-1/4 border hover:border-black/70 font-medium rounded-lg text-xl px-5 py-2.5 text-center flex gap-2 items-center mb-2" onClick={AddToMessageToLInkedMessageBox}>
                            {/* downword icon for insert button for inserting text into linkedIn message */}
                            <svg width="15" height="15" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.1 12.3666V1.43331C6.1 1.05553 6.228 0.739087 6.484 0.483976C6.74 0.228865 7.05644 0.100864 7.43333 0.0999756C7.81111 0.0999756 8.128 0.227976 8.384 0.483976C8.64 0.739976 8.76756 1.05642 8.76667 1.43331V12.3666L12.6333 8.49998C12.8778 8.25553 13.1889 8.13331 13.5667 8.13331C13.9444 8.13331 14.2556 8.25553 14.5 8.49998C14.7444 8.74442 14.8667 9.05553 14.8667 9.43331C14.8667 9.81109 14.7444 10.1222 14.5 10.3666L8.36667 16.5C8.1 16.7666 7.78889 16.9 7.43333 16.9C7.07778 16.9 6.76667 16.7666 6.5 16.5L0.366666 10.3666C0.122222 10.1222 0 9.81109 0 9.43331C0 9.05553 0.122222 8.74442 0.366666 8.49998C0.611111 8.25553 0.922222 8.13331 1.3 8.13331C1.67778 8.13331 1.98889 8.25553 2.23333 8.49998L6.1 12.3666Z" fill="#666D80" />
                            </svg>

                            Insert
                        </button>
                        <button type="button" className="text-white w-1/4 bg-[#3B82F6] hover:bg-[#3B82F6]/90 font-medium rounded-lg text-xl px-5 py-2.5 text-center flex gap-2 items-center mb-2 disabled:cursor-not-allowed" disabled={true}>
                            {/*  Regenerate[reverse icon] for regenerating prompt message*/}
                            <svg width="15" height="15" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 3.24541V0L4.25 4.32724L8.5 8.65459V5.40903C12.006 5.40903 14.875 8.32995 14.875 11.9C14.875 12.9818 14.6094 14.0098 14.131 14.929L15.6719 16.4978C16.5217 15.1454 17 13.5766 17 11.9C17 7.14005 13.1749 3.24541 8.5 3.24541ZM8.5 18.391C4.9937 18.391 2.125 15.4698 2.125 11.9C2.125 10.8182 2.39062 9.79046 2.8687 8.87081L1.32812 7.30224C0.478072 8.60041 0 10.2232 0 11.9C0 16.6599 3.82511 20.5546 8.5 20.5546V23.8L12.75 19.4728L8.5 15.1454V18.391Z" fill="white" />
                            </svg>
                            Regenerate
                        </button>
                    </>
                        : <button type="button" className="text-white w-1/4 bg-[#3B82F6] hover:bg-[#3B82F6]/90 font-medium rounded-lg text-xl px-5 py-2.5 text-center flex gap-2 items-center mb-2" onClick={getPromptMessage}>
                            {/* message icon[left arrow] for generating prompt message*/}
                            <svg width="15" height="15" viewBox="0 0 25 25" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.456 11.6075L2.45599 0.607504C2.28356 0.521271 2.08988 0.486719 1.89827 0.508009C1.70665 0.529299 1.52528 0.605523 1.37599 0.727504C1.23341 0.846997 1.12699 1.00389 1.0687 1.18055C1.0104 1.35721 1.00254 1.54662 1.04599 1.7275L4.00599 12.4975L1.00599 23.2375C0.965214 23.3886 0.960455 23.5471 0.992092 23.7003C1.02373 23.8535 1.09088 23.9972 1.18815 24.1198C1.28541 24.2423 1.41008 24.3403 1.55212 24.4059C1.69416 24.4715 1.84962 24.5029 2.00599 24.4975C2.16253 24.4966 2.31667 24.4589 2.45599 24.3875L24.456 13.3875C24.6198 13.3036 24.7573 13.1761 24.8532 13.0191C24.9492 12.862 25 12.6816 25 12.4975C25 12.3135 24.9492 12.133 24.8532 11.9759C24.7573 11.8189 24.6198 11.6914 24.456 11.6075ZM3.55599 21.6075L5.76599 13.4975H15.006V11.4975H5.76599L3.55599 3.3875L21.766 12.4975L3.55599 21.6075Z" fill="white" />
                            </svg>
                            Generate
                        </button>
                }
            </div>
        </div>
    )
}

export default DialogPrompt