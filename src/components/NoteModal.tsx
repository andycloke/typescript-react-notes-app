import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { Note, NoteStatus } from '../types';

export type FormValues = Pick<Note, 'text' | 'status'>;

interface IProps {
  isOpen: boolean;
  onSaveClick: (values: FormValues) => Promise<void>;
  onCancelClick: () => void;
  initialValues: FormValues;
}

const TEXT_AREA_ROWS = 4;

const NoteModal = ({ isOpen, onSaveClick, onCancelClick, initialValues }: IProps) => {
  const [textValue, setTextValue] = useState(initialValues.text);

  const handleSaveClick = async () => {
    await onSaveClick({ text: textValue, status: NoteStatus.DRAFT });
    setTextValue('');
  };

  return (
    <Modal visible={isOpen} okText="Save" onOk={handleSaveClick} onCancel={onCancelClick}>
      <Input.TextArea
        autoFocus
        rows={TEXT_AREA_ROWS}
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
      ></Input.TextArea>
    </Modal>
  );
};

export default NoteModal;
