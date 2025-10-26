"use client";

// Widget de chat de soporte mejorado con persistencia

import { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const STORAGE_KEY = 'epical_chat_messages';
const CHAT_OPEN_KEY = 'epical_chat_was_open';

const quickReplies = [
  "¿Cuánto tarda el envío?",
  "¿Puedo cambiar mi pedido?",
  "¿Qué garantía tienen?",
  "¿Cómo funciona el montaje?",
  "¿Puedo personalizar mi PC?"
];

const autoReplies: { [key: string]: string } = {
  "envío": "Los envíos se realizan en 24-48 horas laborables. Te enviaremos el número de seguimiento por email.",
  "garantía": "Todos nuestros PCs tienen 3 años de garantía completa. Cubre componentes y montaje.",
  "montaje": "Realizamos montaje profesional con validación térmica, cableado limpio y optimización de ventiladores.",
  "personalizar": "¡Por supuesto! Puedes configurar tu PC a medida en nuestra página de PC a medida.",
  "cambiar": "Puedes modificar tu pedido si aún no está en preparación. Contacta con nosotros por WhatsApp."
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cargar mensajes del localStorage al montar
  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    const wasOpen = localStorage.getItem(CHAT_OPEN_KEY);
    
    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages);
        const messagesWithDates = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (e) {
        console.error('Error cargando mensajes:', e);
        initializeChat();
      }
    } else {
      initializeChat();
    }

    if (wasOpen === 'true') {
      setIsOpen(true);
    }
  }, []);

  // Guardar mensajes en localStorage cuando cambien
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Guardar estado de apertura
  useEffect(() => {
    localStorage.setItem(CHAT_OPEN_KEY, isOpen.toString());
    if (isOpen) {
      setHasNewMessage(false);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Auto-scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const initializeChat = () => {
    setMessages([{
      id: '1',
      text: '¡Hola! 👋 Soy el asistente de TITAN-PC. ¿En qué puedo ayudarte?',
      isUser: false,
      timestamp: new Date()
    }]);
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Si el chat está cerrado y es un mensaje del bot, mostrar indicador
    if (!isOpen && !isUser) {
      setHasNewMessage(true);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    addMessage(inputText, true);
    setInputText('');
    setIsTyping(true);

    // Simular respuesta automática
    setTimeout(() => {
      const userText = inputText.toLowerCase();
      let reply = "Gracias por tu mensaje. Nuestro equipo te responderá pronto por WhatsApp o email.";

      // Buscar respuesta automática
      for (const [keyword, response] of Object.entries(autoReplies)) {
        if (userText.includes(keyword)) {
          reply = response;
          break;
        }
      }

      addMessage(reply, false);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    addMessage(reply, true);
    setIsTyping(true);

    setTimeout(() => {
      const replyText = reply.toLowerCase();
      let response = "Gracias por tu consulta. Te ayudo con esa información.";

      for (const [keyword, autoResponse] of Object.entries(autoReplies)) {
        if (replyText.includes(keyword)) {
          response = autoResponse;
          break;
        }
      }

      addMessage(response, false);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 touch-target relative ${
          isOpen ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'
        }`}
        aria-label="Abrir chat de soporte"
      >
        <svg className="h-6 w-6 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        
        {/* Badge de nuevo mensaje */}
        {hasNewMessage && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 animate-ping"></span>
        )}
      </button>

      {/* Widget de chat */}
      <div className={`fixed bottom-6 right-6 z-50 w-80 md:w-96 h-[500px] bg-black border border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm flex flex-col transition-all duration-300 ${
        isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4 pointer-events-none'
      }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-t-2xl flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center relative">
                <span className="text-white text-sm font-bold">E</span>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-black"></span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">TITAN-PC</h3>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400"></span>
                  En línea
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (confirm('¿Deseas limpiar el historial del chat?')) {
                    localStorage.removeItem(STORAGE_KEY);
                    initializeChat();
                  }
                }}
                className="p-1 rounded-full hover:bg-white/10 transition-colors touch-target"
                aria-label="Limpiar chat"
                title="Limpiar historial"
              >
                <svg className="h-4 w-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors touch-target"
                aria-label="Cerrar chat"
              >
                <svg className="h-4 w-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col gap-1">
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-br-none'
                        : 'bg-white/10 text-white/90 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                  <span className={`text-xs text-white/40 ${message.isUser ? 'text-right' : 'text-left'}`}>
                    {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Indicador de escritura */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/10 text-white/90 px-4 py-3 rounded-lg text-sm rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Elemento para auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Respuestas rápidas */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-white/10">
              <p className="text-white/60 text-xs mb-2">Respuestas rápidas:</p>
              <div className="space-y-2">
                {quickReplies.slice(0, 3).map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="block w-full text-left px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs hover:bg-white/10 transition-colors touch-target"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/10 flex-shrink-0">
            <div className="flex gap-2 mb-3">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 transition-all touch-target"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            {/* Enlaces de contacto */}
            <div className="mt-3 flex gap-2">
              <a
                href="https://wa.me/34XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium text-center hover:bg-green-500/30 transition-colors touch-target"
              >
                WhatsApp
              </a>
              <a
                href="mailto:epicalpc@gmail.com"
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white/70 text-xs font-medium text-center hover:bg-white/10 transition-colors touch-target"
              >
                Email
              </a>
            </div>
          </div>
        </div>
    </>
  );
}
