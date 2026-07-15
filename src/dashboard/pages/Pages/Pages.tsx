import { useState } from 'react';
import PagesHeader from './PagesHeader';
import PagesStats from './PagesStats';
import PagesList, { type StorePage } from './PagesList';
import AddPageDrawer from './modals/AddPageDrawer';
import EditPageDrawer from './modals/EditPageDrawer';

const defaultPages: StorePage[] = [
  { label: 'About Us', type: 'System Page', status: 'empty' },
  { label: 'Refund Policy', type: 'System Page', status: 'empty' },
  { label: 'Terms & Conditions', type: 'System Page', status: 'empty' },
  { label: 'Privacy Policy', type: 'System Page', status: 'empty' },
  { label: 'Contact Us', type: 'System Page', status: 'empty' },
  { label: 'FAQ', type: 'System Page', status: 'empty' },
];

export default function Pages() {
  const [pages, setPages] = useState<StorePage[]>(defaultPages);
  const [addOpen, setAddOpen] = useState(false);
  const [editPage, setEditPage] = useState<StorePage | null>(null);

  const handleAdd = (page: StorePage) => {
    setPages(p => [...p, page]);
  };

  const handleSave = (updated: StorePage) => {
    setPages(p => p.map(pg => pg.label === updated.label ? updated : pg));
  };

  const handleDelete = (label: string) => {
    setPages(p => p.filter(pg => pg.label !== label));
  };

  const total = pages.length;
  const published = pages.filter(p => p.status === 'published').length;
  const drafts = pages.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-5">
      <PagesHeader onAdd={() => setAddOpen(true)} />
      <PagesStats total={total} published={published} drafts={drafts} />
      <PagesList pages={pages} onEdit={setEditPage} />

      <AddPageDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
      <EditPageDrawer
        open={editPage !== null}
        onClose={() => setEditPage(null)}
        page={editPage}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
