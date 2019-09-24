import React, { useState } from 'react';
import { Modal, Input, Checkbox } from 'antd';
import { Note, NoteStatus } from '../types';
import styled from 'styled-components';

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
  const [published, setPublished] = useState(initialValues.status === NoteStatus.PUBLISHED);

  const handleSaveClick = async () => {
    await onSaveClick({
      text: textValue,
      status: published ? NoteStatus.PUBLISHED : NoteStatus.DRAFT
    });
    setTextValue('');
    setPublished(false);
  };

  return (
    <Modal visible={isOpen} okText="Save" onOk={handleSaveClick} onCancel={onCancelClick}>
      <Input.TextArea
        autoFocus
        rows={TEXT_AREA_ROWS}
        value={textValue}
        onChange={e => setTextValue(e.target.value)}
      ></Input.TextArea>
      <SCheckbox checked={published} onChange={() => setPublished(published => !published)}>
        Published
      </SCheckbox>
    </Modal>
  );
};

const SCheckbox = styled(Checkbox)`
  margin-top: 20px;
`;

export default NoteModal;
