import { useRef } from 'react'

type ButtonDeleteProps = {
    btnText: string
    recipeName?: string
    handleDelete: () => void
}

export const ButtonDelete = ({ btnText, recipeName, handleDelete }: ButtonDeleteProps) => {
    const deleteModal = useRef<HTMLDialogElement>(null)
    return (
        <>
            <button className="btn" onClick={() => deleteModal.current?.showModal()}>{btnText}</button>
            <dialog ref={deleteModal} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Atention!</h3>
                    <p className="py-4">Are you sure you want do delete <span className='text-bold'>{recipeName}</span>?</p>
                    <div className='flex'>

                        <form method='dialog'><button onClick={() => handleDelete()} className='btn btn-error'>Yes</button>
                            <button className='btn btn-ghost'>No</button>
                        </form>
                    </div>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}