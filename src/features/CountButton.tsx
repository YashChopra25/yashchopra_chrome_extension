import { useReducer } from "react"
const CountButton = () => {
  const [count, increase] = useReducer((c) => c + 1, 0)
  const OnclickHandler = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      args: [tab],
      func: (tab) => {
        console.log(tab)
        const messageBox = document.querySelector('.msg-form__contenteditable');
        const messagePlaceholder = document.querySelector('.msg-form__placeholder');
        const para = document.createElement('p')
        para.textContent = "this is demo"
        messagePlaceholder.classList.remove('msg-form__placeholder')
        console.log(messagePlaceholder)
        messageBox.replaceChildren(para)
      }
    })
  }

  // useEffect(() => {  
  //   OnclickHandler()
  // }, [])
  return (
    <button
      onClick={() => { increase(); console.log("Asdf"); OnclickHandler() }}
      type="button"
      className="flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none
      shadow-lg hover:shadow-md
      active:scale-105 bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900">
      Count:Hers
      <span className="inline-flex items-center justify-center w-8 h-4 ml-2 text-xs font-semibold rounded-full">
        {count}
      </span>
    </button>
  )
}

export default CountButton