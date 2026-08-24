import {STATUSES} from "@/lib/progress";
const styles={not_started:"bg-slate-50 text-slate-500 border-slate-200",learning:"bg-blue-50 text-blue-700 border-blue-100",needs_practice:"bg-amber-50 text-amber-700 border-amber-100",prepared:"bg-emerald-50 text-emerald-700 border-emerald-100"};
export default function StatusBadge({status}){const x=STATUSES[status]||STATUSES.not_started;return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}><span>{x.symbol}</span>{x.label}</span>}
