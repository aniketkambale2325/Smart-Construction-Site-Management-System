import {useState} from 'react';
import { askChatbot } from '../../api/aiApi';

export default function ChatbotWidget() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState([
        {role: "bot", text: "Hi! Ask me about progress, materials, attendance, salary, or reports."},
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) =>{
        e.preventDefault();
        if(!input.trim()) return;
        
        const question = input;
        setMessage((prev) => [...prev, {role: "user", text: question}]);
        setInput("");
        setLoading(true);

       try {
            const result = await askChatbot(question, {});
            setMessage((prev) => [...prev, { role: "bot", text: result.answer }]);
        } catch {
            setMessage((prev) => [...prev, { role: "bot", text: "Sorry, I couldn't reach the assistant right now." }]);
        } finally {
             setLoading(false);
        }
    };

    if(!open){
        return(
            <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-teal-700 text-white rounded-full w-14 h-14 shadow-lg text-xl"
      >
        💬
      </button>
        );
    }
    return(
            <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl rounded-lg flex flex-col" style={{ height: 420 }}>
      <div className="bg-teal-700 text-white p-3 rounded-t-lg flex justify-between items-center">
        <span className="font-medium">Project Assistant</span>
        <button onClick={() => setOpen(false)}>✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {message.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[85%] text-sm ${
              m.role === "user" ? "bg-teal-100 ml-auto" : "bg-gray-100"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className="bg-gray-100 p-2 rounded text-sm w-fit">Typing...</div>}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button type="submit" className="bg-teal-700 text-white px-3 py-1 rounded text-sm">
          Send
        </button>
      </form>
    </div>

    );
}