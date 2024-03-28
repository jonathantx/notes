import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner';

interface NewNoteCardProps {
    onNoteCreated: (content: string) => void;
}

export function NewNoteCard ({onNoteCreated} : NewNoteCardProps) {
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
    const [isRecording, setIsRecording] = useState(false)
    const [content, setContent] = useState('')

    function handleStartEditor(){
        setShouldShowOnboarding(false)
    }

    function handleContentChanged (event: ChangeEvent<HTMLTextAreaElement>) {

        setContent(event.target.value)

        if(event.target.value === '')
            setShouldShowOnboarding(true)
    }

    function handleSaveNote (event: FormEvent) {
        event.preventDefault()

        onNoteCreated(content)

        setContent('')
        setShouldShowOnboarding(true)

        toast.success('Nota criada com sucesso');

    }

    function handleStartRecording() {
        setIsRecording(true)
    }

    return (
    <Dialog.Root>

        {/* Botão para Ação */}
        <Dialog.Trigger className="rounded-md bg-slate-700 p-5 gap-y-3 flex flex-col text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
            <span className="text-sm font-medium text-slate-200">
                Adicionar nota
            </span>
            <p className="text-sm leading-6 text-slate-400">
                Grave uma nota em áudio que será convertida para texto automaticamente.
            </p>
        </Dialog.Trigger>

        {/* Modal */}
        <Dialog.Portal> 
            <Dialog.Overlay className="fixed inset-0 bg-slate-800 bg-opacity-75 transition-opacity duration-300" />
            <Dialog.Content className="fixed left-1/2 overflow-hidden top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-slate-700 h-[60vh] rounded-md flex flex-col outline-none">
                <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                        <X className="size-5"/>
                </Dialog.Close>
                <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
                    <div className="flex flex-1 flex-col gap-3 p-5">
                        <span className="text-sm font-medium text-slate-300">
                            Adicionar nota
                        </span>
                        {shouldShowOnboarding ? (
                                <p className="text-sm leading-6 text-slate-400">
                                    Comece <button type="button" onClick={handleStartRecording}className="font-medium text-lime-400 hover:underline">gravando uma nota</button> em áudio ou se preferir <button type="button" onClick={handleStartEditor} className="font-medium text-lime-400 hover:underline">utilize apenas texto</button>.
                                </p>
                        ) : (
                            <textarea autoFocus 
                                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" 
                                    onChange={handleContentChanged}
                                    value={content}
                            />
                        )}
                    </div>        
                    
            
                        <button type="submit"
                            className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500">
                            Salvar nota
                        </button>

                
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
    )
}