import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const TeacherModal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }> = ({ title, onClose, children, wide }) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); return () => dialog?.close(); }, []);
  return <dialog ref={ref} className={`teacher-modal ${wide ? 'teacher-modal-wide' : ''}`} aria-label={title} onCancel={event => { event.preventDefault(); onClose(); }}>
    <header><h3>{title}</h3><button type="button" aria-label="关闭" onClick={onClose}><X size={20} /></button></header>
    {children}
  </dialog>;
};
export default TeacherModal;
