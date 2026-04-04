import { useState, useEffect, useMemo } from 'react';
import { X, Users, UserPlus, UserCheck, AlertTriangle, Search, MessageCircle, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type ClientStatus = 'lead' | 'trial' | 'active' | 'inactive' | 'expired';

interface Client {
  id: string;
  name: string;
  email: string | null;
  whatsapp: string | null;
  origin: string | null;
  robot: string | null;
  plan: string | null;
  expiry_date: string | null;
  status: ClientStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_COLORS: Record<ClientStatus, string> = {
  lead: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  trial: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  expired: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const STATUS_OPTIONS: ClientStatus[] = ['lead', 'trial', 'active', 'inactive', 'expired'];

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel = ({ onClose }: AdminPanelProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all');
  const [originFilter, setOriginFilter] = useState<string>('all');
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', whatsapp: '', origin: '', robot: '', plan: '', expiry_date: '', status: 'lead' as ClientStatus });

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    if (!error && data) setClients(data as Client[]);
    setLoading(false);
  };

  useEffect(() => { fetchClients(); }, []);

  const filtered = useMemo(() => {
    return clients.filter(c => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (originFilter !== 'all' && c.origin !== originFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!c.name.toLowerCase().includes(s) && !(c.email?.toLowerCase().includes(s))) return false;
      }
      return true;
    });
  }, [clients, statusFilter, originFilter, search]);

  const origins = useMemo(() => [...new Set(clients.map(c => c.origin).filter(Boolean))], [clients]);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const in7Days = new Date(now.getTime() + 7 * 86400000);

  const totalClients = clients.length;
  const newThisMonth = clients.filter(c => new Date(c.created_at) >= startOfMonth).length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const expiringSoon = clients.filter(c => c.expiry_date && new Date(c.expiry_date) <= in7Days && new Date(c.expiry_date) >= now && c.status === 'active').length;

  const updateField = async (id: string, field: string, value: string) => {
    await supabase.from('clients').update({ [field]: value }).eq('id', id);
    setClients(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const saveNotes = async (id: string) => {
    await updateField(id, 'notes', notesValue);
    setEditingNotes(null);
  };

  const addClient = async () => {
    const { data, error } = await supabase.from('clients').insert({
      name: newClient.name,
      email: newClient.email || null,
      whatsapp: newClient.whatsapp || null,
      origin: newClient.origin || null,
      robot: newClient.robot || null,
      plan: newClient.plan || null,
      expiry_date: newClient.expiry_date || null,
      status: newClient.status,
    }).select().single();
    if (!error && data) {
      setClients(prev => [data as Client, ...prev]);
      setShowAddModal(false);
      setNewClient({ name: '', email: '', whatsapp: '', origin: '', robot: '', plan: '', expiry_date: '', status: 'lead' });
    }
  };

  const deleteClient = async (id: string) => {
    await supabase.from('clients').delete().eq('id', id);
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const openWhatsApp = (phone: string) => {
    const clean = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${clean}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/10 bg-card">
        <div className="flex items-center gap-3">
          <span className="font-montserrat font-bold text-lg text-foreground">VIKING</span>
          <span className="font-montserrat font-medium text-xs tracking-widest text-primary">ADMIN CRM</span>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <X className="w-5 h-5 text-muted" />
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4">
        {[
          { label: 'Total Clientes', value: totalClients, icon: Users, color: 'text-primary' },
          { label: 'Novos este mês', value: newThisMonth, icon: UserPlus, color: 'text-blue-400' },
          { label: 'Ativos', value: activeClients, icon: UserCheck, color: 'text-green-400' },
          { label: 'Vencendo em 7d', value: expiringSoon, icon: AlertTriangle, color: 'text-yellow-400' },
        ].map((card, i) => (
          <div key={i} className="bg-card border border-foreground/10 rounded-xl p-4 flex items-center gap-3">
            <card.icon className={`w-8 h-8 ${card.color}`} />
            <div>
              <p className="text-2xl font-montserrat font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted font-opensans">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="px-6 py-3 flex flex-wrap items-center gap-3 border-b border-foreground/10">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-secondary border border-foreground/10 rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as ClientStatus | 'all')}
          className="bg-secondary border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">Todos Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <select
          value={originFilter}
          onChange={e => setOriginFilter(e.target.value)}
          className="bg-secondary border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">Todas Origens</option>
          {origins.map(o => <option key={o} value={o!}>{o}</option>)}
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="ml-auto flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-montserrat font-bold text-sm hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> Novo Cliente
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 py-2">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-muted">Carregando...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-background z-10">
              <tr className="border-b border-foreground/10 text-left">
                <th className="py-3 px-2 font-montserrat font-semibold text-muted text-xs uppercase tracking-wider">Nome</th>
                <th className="py-3 px-2 font-montserrat font-semibold text-muted text-xs uppercase tracking-wider">Email</th>
                <th className="py-3 px-2 font-montserrat font-semibold text-muted text-xs uppercase tracking-wider">WhatsApp</th>
                <th className="py-3 px-2 font-montserrat font-semibold text-muted text-xs uppercase tracking-wider">Origem</th>
                <th className="py-3 px-2 font-montserrat font-semibold text-muted text-xs uppercase tracking-wider">Robô</th>
                <th className="py-3 px-2 font-montserrat font-semibold text-muted text-xs uppercase tracking-wider">Plano</th>
                <th className="py-3 px-2 font-montserrat font-semibold text-muted text-xs uppercase tracking-wider">Vencimento</th>
                <th className="py-3 px-2 font-montserrat font-semibold text-muted text-xs uppercase tracking-wider">Status</th>
                <th className="py-3 px-2 font-montserrat font-semibold text-muted text-xs uppercase tracking-wider">Notas</th>
                <th className="py-3 px-2 font-montserrat font-semibold text-muted text-xs uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={10} className="text-center py-8 text-muted">Nenhum cliente encontrado</td></tr>
              ) : filtered.map(client => (
                <tr key={client.id} className="border-b border-foreground/5 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-2 text-foreground font-medium">{client.name}</td>
                  <td className="py-3 px-2 text-muted">{client.email || '—'}</td>
                  <td className="py-3 px-2">
                    {client.whatsapp ? (
                      <button onClick={() => openWhatsApp(client.whatsapp!)} className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{client.whatsapp}</span>
                      </button>
                    ) : '—'}
                  </td>
                  <td className="py-3 px-2 text-muted">{client.origin || '—'}</td>
                  <td className="py-3 px-2 text-muted">{client.robot || '—'}</td>
                  <td className="py-3 px-2 text-muted">{client.plan || '—'}</td>
                  <td className="py-3 px-2 text-muted">{client.expiry_date || '—'}</td>
                  <td className="py-3 px-2">
                    <select
                      value={client.status}
                      onChange={e => updateField(client.id, 'status', e.target.value)}
                      className={`text-xs px-2 py-1 rounded-md border ${STATUS_COLORS[client.status]} bg-transparent cursor-pointer focus:outline-none`}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-card text-foreground">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </td>
                  <td className="py-3 px-2 max-w-[200px]">
                    {editingNotes === client.id ? (
                      <div className="flex gap-1">
                        <input
                          value={notesValue}
                          onChange={e => setNotesValue(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && saveNotes(client.id)}
                          className="flex-1 bg-secondary border border-foreground/10 rounded px-2 py-1 text-xs text-foreground focus:outline-none focus:border-primary"
                          autoFocus
                        />
                        <button onClick={() => saveNotes(client.id)} className="text-primary text-xs font-bold">✓</button>
                        <button onClick={() => setEditingNotes(null)} className="text-muted text-xs">✗</button>
                      </div>
                    ) : (
                      <span
                        onClick={() => { setEditingNotes(client.id); setNotesValue(client.notes || ''); }}
                        className="text-muted text-xs cursor-pointer hover:text-foreground truncate block"
                        title={client.notes || 'Clique para adicionar notas'}
                      >
                        {client.notes || '—'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <button onClick={() => deleteClient(client.id)} className="text-destructive/60 hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[110] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-card border border-foreground/10 rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-montserrat font-bold text-foreground">Novo Cliente</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted hover:text-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'name', label: 'Nome *', type: 'text' },
                { key: 'email', label: 'Email', type: 'email' },
                { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
                { key: 'origin', label: 'Origem', type: 'text' },
                { key: 'robot', label: 'Robô', type: 'text' },
                { key: 'plan', label: 'Plano', type: 'text' },
                { key: 'expiry_date', label: 'Vencimento', type: 'date' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs text-muted font-montserrat">{f.label}</label>
                  <input
                    type={f.type}
                    value={(newClient as any)[f.key]}
                    onChange={e => setNewClient(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full mt-1 bg-secondary border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-muted font-montserrat">Status</label>
                <select
                  value={newClient.status}
                  onChange={e => setNewClient(prev => ({ ...prev, status: e.target.value as ClientStatus }))}
                  className="w-full mt-1 bg-secondary border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <button
              onClick={addClient}
              disabled={!newClient.name}
              className="w-full mt-4 bg-primary text-primary-foreground py-2 rounded-lg font-montserrat font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50"
            >
              Adicionar Cliente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
