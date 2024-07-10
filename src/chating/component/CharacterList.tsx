import React from 'react';

interface CharacterListProps {
    characters: { name: string; imageSrc: string }[];
    onSelect: (character: { name: string; imageSrc: string }) => void;
    selectedCharacter: { name: string; imageSrc: string } | null;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onSelect, selectedCharacter }) => {
    return (
        <div className="character-list">
            {characters.map((character) => (
                <div
                    key={character.name}
                    className={`character-list-item ${selectedCharacter?.name === character.name ? 'selected' : ''}`}
                    onClick={() => onSelect(character)}
                >
                    <img src={character.imageSrc} alt={character.name} />
                    <span>{character.name}</span>
                </div>
            ))}
        </div>
    );
};

export default CharacterList;
