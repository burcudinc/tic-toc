import { useState } from "react"

export default function PlayerInfo({ initialName, symbol, isActive}) {
    const [playerName , setPlayerName] = useState(initialName);
    const [isEdit, setIsEdit] = useState(false);

    function handleEditClick() {
        setIsEdit((prev) => !prev);  // best Practise Değişkeni fonsiyon içinde önceki değeri üzerinden değiştirmek
     //  isEdit ? setIsEdit(false) : setIsEdit(true);
    }

    function handeChange(event) {
        const name = event.target.value;
        setPlayerName(name);
    }

    let editablePlayerName = <span className='player-name'>{playerName}</span>;
    let buttonCaption = isEdit ? 'Save' : 'Edit';

    if (isEdit) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handeChange} />
    } else {
        editablePlayerName = <span className='player-name'>{playerName}</span>;
    }

    return (
        <li className={isActive ? 'active' : undefined }>
        <span className='player'>
        {editablePlayerName}
        <span className='player-symbol'>{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{buttonCaption}</button>
      </li>
    )
}