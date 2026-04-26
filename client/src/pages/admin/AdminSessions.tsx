import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Loader2, X, Check } from "lucide-react";
import { SESSION_TYPE_LABELS, SESSION_TYPE_COLOURS } from "@/lib/sessionUtils";
import type { SessionType } from "@/lib/sessionUtils";

const SESSION_TYPES = Object.keys(SESSION_TYPE_LABELS) as SessionType[];

type SessionForm = {
  sessionDate: string;
  startTime: string;
  endTime: string;
  title: string;
  topic: string;
  type: SessionType;
  description: string;
  venue: string;
  isPast: boolean;
};

const EMPTY_FORM: SessionForm = {
  sessionDate: "",
  startTime: "10:00",
  endTime: "12:00",
  title: "",
  topic: "",
  type: "community",
  description: "",
  venue: "127 North Road Community Hall",
  isPast: false,
};

export default function AdminSessions() {
  const utils = trpc.useUtils();
  const { data: sessions, isLoading } = trpc.sessions.all.useQuery();
  const createSession = trpc.sessions.create.useMutation({
    onSuccess: () => { utils.sessions.all.invalidate(); toast.success("Session created"); setShowAdd(false); setForm(EMPTY_FORM); },
    onError: (e) => toast.error(e.message),
  });
  const updateSession = trpc.sessions.update.useMutation({
    onSuccess: () => { utils.sessions.all.invalidate(); toast.success("Session updated"); setEditId(null); },
    onError: (e) => toast.error(e.message),
  });
  const deleteSession = trpc.sessions.delete.useMutation({
    onSuccess: () => { utils.sessions.all.invalidate(); toast.success("Session deleted"); },
    onError: (e) => toast.error(e.message),
  });

  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<SessionForm>(EMPTY_FORM);
  const [editForm, setEditForm] = useState<SessionForm>(EMPTY_FORM);

  function startEdit(s: any) {
    const dateStr = s.sessionDate instanceof Date
      ? s.sessionDate.toISOString().slice(0, 10)
      : String(s.sessionDate);
    setEditId(s.id);
    setEditForm({
      sessionDate: dateStr,
      startTime: s.startTime,
      endTime: s.endTime,
      title: s.title,
      topic: s.topic,
      type: s.type,
      description: s.description ?? "",
      venue: s.venue,
      isPast: s.isPast,
    });
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    createSession.mutate(form as any);
  }

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editId) return;
    updateSession.mutate({ id: editId, data: editForm as any });
  }

  const InputCls = "w-full px-3 py-2 rounded-lg text-sm border bg-white focus:outline-none focus:ring-2 focus:ring-teal-400";
  const LabelCls = "block text-xs font-medium text-gray-600 mb-1";

  function SessionFormFields({ f, setF }: { f: SessionForm; setF: (v: SessionForm) => void }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={LabelCls}>Date *</label>
          <input type="date" required value={f.sessionDate} onChange={(e) => setF({ ...f, sessionDate: e.target.value })} className={InputCls} />
        </div>
        <div>
          <label className={LabelCls}>Type *</label>
          <select required value={f.type} onChange={(e) => setF({ ...f, type: e.target.value as SessionType })} className={InputCls}>
            {SESSION_TYPES.map((t) => <option key={t} value={t}>{SESSION_TYPE_LABELS[t]}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={LabelCls}>Title *</label>
          <input type="text" required value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} className={InputCls} placeholder="Session title" />
        </div>
        <div className="sm:col-span-2">
          <label className={LabelCls}>Topic *</label>
          <input type="text" required value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })} className={InputCls} placeholder="Session topic" />
        </div>
        <div>
          <label className={LabelCls}>Start Time</label>
          <input type="time" value={f.startTime} onChange={(e) => setF({ ...f, startTime: e.target.value })} className={InputCls} />
        </div>
        <div>
          <label className={LabelCls}>End Time</label>
          <input type="time" value={f.endTime} onChange={(e) => setF({ ...f, endTime: e.target.value })} className={InputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={LabelCls}>Venue</label>
          <input type="text" value={f.venue} onChange={(e) => setF({ ...f, venue: e.target.value })} className={InputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={LabelCls}>Description</label>
          <textarea rows={3} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} className={InputCls} placeholder="Session description…" />
        </div>
        <div className="sm:col-span-2 flex items-center gap-2">
          <input type="checkbox" id="isPast" checked={f.isPast} onChange={(e) => setF({ ...f, isPast: e.target.checked })} className="h-4 w-4 rounded" style={{ accentColor: "var(--teal-600)" }} />
          <label htmlFor="isPast" className="text-sm text-gray-600">Mark as past session</label>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--teal-800)" }}>Sessions</h1>
          <p className="text-sm text-gray-500 mt-1">{sessions?.length ?? 0} sessions total</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--teal-600)" }}
        >
          <Plus size={16} />
          Add Session
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="mb-6 p-6 rounded-xl border bg-white" style={{ borderColor: "var(--cream-300)" }}>
          <h2 className="text-base font-semibold mb-4" style={{ color: "var(--teal-700)" }}>New Session</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <SessionFormFields f={form} setF={setForm} />
            <div className="flex gap-3">
              <button type="submit" disabled={createSession.isPending} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60" style={{ backgroundColor: "var(--teal-600)" }}>
                {createSession.isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                Save Session
              </button>
              <button type="button" onClick={() => { setShowAdd(false); setForm(EMPTY_FORM); }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border" style={{ borderColor: "var(--cream-300)" }}>
                <X size={14} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sessions table */}
      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin" style={{ color: "var(--teal-600)" }} size={28} /></div>
      ) : (
        <div className="space-y-3">
          {sessions?.map((s) => {
            const dateStr = s.sessionDate instanceof Date ? s.sessionDate.toISOString().slice(0, 10) : String(s.sessionDate);
            const isEditing = editId === s.id;
            return (
              <div key={s.id} className="bg-white rounded-xl border p-5" style={{ borderColor: "var(--cream-300)" }}>
                {isEditing ? (
                  <form onSubmit={handleUpdate} className="space-y-4">
                    <SessionFormFields f={editForm} setF={setEditForm} />
                    <div className="flex gap-3">
                      <button type="submit" disabled={updateSession.isPending} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60" style={{ backgroundColor: "var(--teal-600)" }}>
                        {updateSession.isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        Save Changes
                      </button>
                      <button type="button" onClick={() => setEditId(null)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border" style={{ borderColor: "var(--cream-300)" }}>
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">{dateStr}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${SESSION_TYPE_COLOURS[s.type as SessionType]}`}>
                          {SESSION_TYPE_LABELS[s.type as SessionType]}
                        </span>
                        {s.isPast && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Past</span>}
                      </div>
                      <h3 className="font-semibold text-sm" style={{ color: "var(--teal-800)" }}>{s.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{s.topic}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => startEdit(s)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                        <Pencil size={15} style={{ color: "var(--teal-600)" }} />
                      </button>
                      <button
                        onClick={() => { if (confirm("Delete this session?")) deleteSession.mutate({ id: s.id }); }}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
