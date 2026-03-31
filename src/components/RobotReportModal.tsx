import { useState } from 'react';
import { X, Upload, Lock, FileText, BarChart3, TrendingUp, Printer, Maximize2, Shield } from 'lucide-react';
import { VikingManagementPanel } from './VikingManagementCards';
import vikingAlphaBtcusd from '@/assets/viking-alpha-btcusd.png';
import vikingAlphaDax from '@/assets/viking-alpha-dax.png';

interface ReportData {
  titulo: string;
  periodo: string;
  ativo: string;
  capitalInicial: string;
  loteOperado: string;
  totalOperacoes: string;
  winRate: string;
  winsLosses: string;
  lucroTotal: string;
  retorno: string;
  drawdownMaximo: string;
  riscoMaximo: string;
  observacoes: string;
  prints: { label: string; sublabel: string; url: string }[];
}

const emptyReport = (quarter: string): ReportData => ({
  titulo: '',
  periodo: quarter,
  ativo: '',
  capitalInicial: '',
  loteOperado: '',
  totalOperacoes: '',
  winRate: '',
  winsLosses: '',
  lucroTotal: '',
  retorno: '',
  drawdownMaximo: '',
  riscoMaximo: '',
  observacoes: '',
  prints: [
    { label: 'Results screenshot', sublabel: 'MT5 - General summary', url: '' },
    { label: 'Equity curve', sublabel: 'MT5 - Balance chart', url: '' },
    { label: 'Trade report', sublabel: 'MT5 - Trade list', url: '' },
    { label: 'Trade chart', sublabel: 'MT5 - Entries & exits', url: '' },
  ],
});

const QUARTERS = ['Jan – Mar', 'Apr – Jun', 'Jul – Sep', 'Oct – Dec'];

const getStorageKey = (robotName: string) => `viking_robot_${robotName.replace(/[^a-zA-Z0-9]/g, '_')}`;

const loadRobotData = (robotName: string): ReportData[] => {
  try {
    const stored = localStorage.getItem(getStorageKey(robotName));
    if (stored) return JSON.parse(stored);
  } catch {}
  const year = new Date().getFullYear();
  return QUARTERS.map(t => emptyReport(`${t} ${year}`));
};

const saveRobotData = (robotName: string, data: ReportData[]) => {
  localStorage.setItem(getStorageKey(robotName), JSON.stringify(data));
};

const RobotReportModal = ({ robotName, onClose }: { robotName: string; onClose: () => void }) => {
  const [mode, setMode] = useState<'view' | 'manage'>('view');
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [selectedReport, setSelectedReport] = useState(0);
  const [reports, setReports] = useState<ReportData[]>(() => loadRobotData(robotName));
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [showManagement, setShowManagement] = useState(false);

  const currentReport = reports[selectedReport];

  const handleManage = () => {
    if (!authenticated) {
      setShowPasswordPrompt(true);
    } else {
      setMode('manage');
    }
  };

  const handleView = () => {
    setMode('view');
    setAuthenticated(false);
    setPasswordInput('');
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === 'Viking123*') {
      setAuthenticated(true);
      setMode('manage');
      setShowPasswordPrompt(false);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const updateField = (field: keyof ReportData, value: string) => {
    const updated = [...reports];
    updated[selectedReport] = { ...updated[selectedReport], [field]: value };
    setReports(updated);
    saveRobotData(robotName, updated);
  };

  const handlePrintUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...reports];
      const prints = [...updated[selectedReport].prints];
      prints[index] = { ...prints[index], url: e.target?.result as string };
      updated[selectedReport] = { ...updated[selectedReport], prints };
      setReports(updated);
      saveRobotData(robotName, updated);
    };
    reader.readAsDataURL(file);
  };

  const isEditable = mode === 'manage';
  const printIcons = [FileText, TrendingUp, BarChart3, Printer];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      <div
        className="bg-card border border-foreground/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-foreground/10">
          <span className="text-muted text-xs font-montserrat uppercase tracking-wider">
            Report Q{selectedReport + 1} {new Date().getFullYear()} – {robotName}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg overflow-hidden border border-foreground/10">
              <button
                onClick={handleView}
                className={`px-4 py-1.5 text-xs font-montserrat font-bold transition-colors ${
                  mode === 'view' ? 'text-black' : 'text-white hover:brightness-125'
                }`}
                style={{ backgroundColor: mode === 'view' ? '#aaff00' : '#1a5fa8' }}
              >
                View
              </button>
              <button
                onClick={handleManage}
                className={`px-4 py-1.5 text-xs font-montserrat font-bold transition-colors ${
                  mode === 'manage' ? 'text-black' : 'text-white hover:brightness-125'
                }`}
                style={{ backgroundColor: mode === 'manage' ? '#aaff00' : '#1a5fa8' }}
              >
                Manage
              </button>
            </div>
            <button onClick={onClose} className="bg-foreground/10 hover:bg-foreground/20 rounded-full p-1.5 transition-colors ml-2">
              <X size={16} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* Password prompt */}
        {showPasswordPrompt && !authenticated && (
          <div className="p-6 border-b border-foreground/10 bg-secondary/50">
            <div className="flex items-center gap-2 mb-3">
              <Lock size={16} className="text-primary" />
              <span className="font-montserrat font-bold text-foreground text-sm">Restricted Access</span>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="Enter management password"
                className="flex-1 bg-background border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
              />
              <button
                onClick={handlePasswordSubmit}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-montserrat font-bold text-sm hover:brightness-110 transition-all"
              >
                Enter
              </button>
            </div>
            {passwordError && (
              <p className="text-destructive text-xs mt-2 font-montserrat">Incorrect password.</p>
            )}
          </div>
        )}

        {/* Quarter selector */}
        <div className="flex gap-2 p-4 border-b border-foreground/10">
          {QUARTERS.map((t, i) => (
            <button
              key={t}
              onClick={() => setSelectedReport(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-montserrat font-bold transition-all ${
                selectedReport === i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-foreground/5 text-muted hover:text-foreground hover:bg-foreground/10'
              }`}
            >
              Q{i + 1}
            </button>
          ))}
        </div>

        {/* Robot title */}
        <div className="p-4 border-b border-foreground/10 flex items-center gap-4">
          {(robotName === 'BTC/USD' || robotName === 'DAX') && (
            <img
              src={robotName === 'BTC/USD' ? vikingAlphaBtcusd : vikingAlphaDax}
              alt={`Viking Alpha - ${robotName}`}
              className="w-14 h-14 rounded-lg object-cover shadow-md"
            />
          )}
          <div>
            <h3 className="font-montserrat text-lg font-bold text-foreground">Viking {robotName}</h3>
            <p className="text-muted text-xs font-montserrat">
              {currentReport.titulo || `Viking ${robotName} – FX Globe Backtest – ${currentReport.periodo}`}
            </p>
          </div>
        </div>

        {/* Dashboard */}
        <div className="p-4">
          <div className="border border-foreground/10 rounded-lg p-4 mb-4">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-foreground/5">
              <div>
                <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Asset</span>
                {isEditable ? (
                  <input value={currentReport.ativo} onChange={(e) => updateField('ativo', e.target.value)}
                    className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-foreground text-sm font-bold font-montserrat mt-1 focus:outline-none focus:border-primary" />
                ) : (
                  <p className="text-foreground font-montserrat font-bold text-sm mt-1">{currentReport.ativo || '—'}</p>
                )}
              </div>
              <div>
                <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Period</span>
                {isEditable ? (
                  <input value={currentReport.periodo} onChange={(e) => updateField('periodo', e.target.value)}
                    className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-foreground text-sm font-bold font-montserrat mt-1 focus:outline-none focus:border-primary" />
                ) : (
                  <p className="text-foreground font-montserrat font-bold text-sm mt-1">{currentReport.periodo || '—'}</p>
                )}
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-foreground/5">
              <div>
                <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Initial Capital</span>
                {isEditable ? (
                  <input value={currentReport.capitalInicial} onChange={(e) => updateField('capitalInicial', e.target.value)}
                    className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-sm font-bold font-montserrat mt-1 focus:outline-none focus:border-primary" style={{ color: 'hsl(74,100%,43%)' }} />
                ) : (
                  <p className="text-sm font-bold font-montserrat mt-1" style={{ color: 'hsl(74,100%,43%)' }}>{currentReport.capitalInicial || '—'}</p>
                )}
              </div>
              <div>
                <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Lot Size</span>
                {isEditable ? (
                  <input value={currentReport.loteOperado} onChange={(e) => updateField('loteOperado', e.target.value)}
                    className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-foreground text-sm font-bold font-montserrat mt-1 focus:outline-none focus:border-primary" />
                ) : (
                  <p className="text-foreground text-sm font-bold font-montserrat mt-1">{currentReport.loteOperado || '—'}</p>
                )}
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-foreground/5">
              <div>
                <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Total Trades</span>
                {isEditable ? (
                  <input value={currentReport.totalOperacoes} onChange={(e) => updateField('totalOperacoes', e.target.value)}
                    className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-foreground text-sm font-bold font-montserrat mt-1 focus:outline-none focus:border-primary" />
                ) : (
                  <p className="text-foreground text-sm font-bold font-montserrat mt-1">{currentReport.totalOperacoes || '—'}</p>
                )}
              </div>
              <div>
                <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Win Rate</span>
                {isEditable ? (
                  <input value={currentReport.winRate} onChange={(e) => updateField('winRate', e.target.value)}
                    placeholder="76.9%" className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-sm font-bold font-montserrat mt-1 focus:outline-none focus:border-primary" style={{ color: 'hsl(74,100%,43%)' }} />
                ) : (
                  <p className="text-sm font-bold font-montserrat mt-1" style={{ color: 'hsl(74,100%,43%)' }}>{currentReport.winRate || '—'}</p>
                )}
                {!isEditable && currentReport.winsLosses && (
                  <span className="text-muted text-[10px] font-montserrat">{currentReport.winsLosses}</span>
                )}
                {isEditable && (
                  <input value={currentReport.winsLosses} onChange={(e) => updateField('winsLosses', e.target.value)}
                    placeholder="81w / 131" className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-muted text-[10px] font-montserrat mt-1 focus:outline-none focus:border-primary" />
                )}
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-foreground/5">
              <div>
                <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Total Profit</span>
                {isEditable ? (
                  <input value={currentReport.lucroTotal} onChange={(e) => updateField('lucroTotal', e.target.value)}
                    placeholder="+$403.08" className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-sm font-bold font-montserrat mt-1 focus:outline-none focus:border-primary" style={{ color: '#22c55e' }} />
                ) : (
                  <p className="text-sm font-bold font-montserrat mt-1" style={{ color: '#22c55e' }}>{currentReport.lucroTotal || '—'}</p>
                )}
              </div>
              <div>
                <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Return</span>
                {isEditable ? (
                  <input value={currentReport.retorno} onChange={(e) => updateField('retorno', e.target.value)}
                    placeholder="+201%" className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-sm font-bold font-montserrat mt-1 focus:outline-none focus:border-primary" style={{ color: '#22c55e' }} />
                ) : (
                  <p className="text-sm font-bold font-montserrat mt-1" style={{ color: '#22c55e' }}>{currentReport.retorno || '—'}</p>
                )}
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Max Drawdown</span>
                {isEditable ? (
                  <input value={currentReport.drawdownMaximo} onChange={(e) => updateField('drawdownMaximo', e.target.value)}
                    placeholder="24.61%" className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-sm font-bold font-montserrat mt-1 focus:outline-none focus:border-primary" style={{ color: '#ef4444' }} />
                ) : (
                  <p className="text-sm font-bold font-montserrat mt-1" style={{ color: '#ef4444' }}>{currentReport.drawdownMaximo || '—'}</p>
                )}
              </div>
              <div>
                <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Max Risk</span>
                {isEditable ? (
                  <input value={currentReport.riscoMaximo} onChange={(e) => updateField('riscoMaximo', e.target.value)}
                    placeholder="$49.23" className="block w-full bg-background border border-foreground/10 rounded px-2 py-1 text-sm font-bold font-montserrat mt-1 focus:outline-none focus:border-primary" style={{ color: '#ef4444' }} />
                ) : (
                  <p className="text-sm font-bold font-montserrat mt-1" style={{ color: '#ef4444' }}>{currentReport.riscoMaximo || '—'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="border border-foreground/10 rounded-lg p-4 mb-4">
            <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">Period Notes</span>
            {isEditable ? (
              <textarea
                value={currentReport.observacoes}
                onChange={(e) => updateField('observacoes', e.target.value)}
                placeholder="Add notes about this period..."
                rows={3}
                className="block w-full bg-background border border-foreground/10 rounded px-3 py-2 text-foreground text-sm font-montserrat mt-1 focus:outline-none focus:border-primary resize-none"
              />
            ) : (
              <p className="text-foreground text-sm font-montserrat mt-1 whitespace-pre-wrap">{currentReport.observacoes || '—'}</p>
            )}
          </div>

          {/* Fullscreen image overlay */}
          {fullscreenImage && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
              onClick={() => setFullscreenImage(null)}
            >
              <button
                onClick={() => setFullscreenImage(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
              >
                <X size={24} className="text-white" />
              </button>
              <img src={fullscreenImage} alt="Report fullscreen" className="max-w-[95vw] max-h-[95vh] object-contain" />
            </div>
          )}

          {/* Print areas */}
          <div className="grid grid-cols-2 gap-3">
            {currentReport.prints.map((print, i) => {
              const Icon = printIcons[i] || FileText;
              return (
                <div
                  key={i}
                  className="border border-foreground/10 rounded-lg p-4 flex flex-col items-center justify-center text-center min-h-[100px] relative group hover:border-foreground/20 transition-colors"
                >
                  {print.url ? (
                    <>
                      <img src={print.url} alt={print.label} className="w-full h-auto rounded max-h-40 object-contain" />
                      <button
                        onClick={() => setFullscreenImage(print.url)}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-colors opacity-0 group-hover:opacity-100"
                        title="Expand"
                      >
                        <Maximize2 size={14} className="text-white" />
                      </button>
                    </>
                  ) : (
                    <>
                      <Icon size={20} className="text-muted mb-2" />
                      <span className="text-foreground text-xs font-montserrat font-bold">{print.label}</span>
                      <span className="text-muted text-[10px] font-montserrat">{print.sublabel}</span>
                    </>
                  )}
                  {isEditable && (
                    <label className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                      <Upload size={20} className="text-primary" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePrintUpload(i, file);
                        }}
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </div>

          {/* Save button */}
          {isEditable && (
            <button
              onClick={() => {
                saveRobotData(robotName, reports);
                setMode('view');
                setAuthenticated(false);
                setPasswordInput('');
              }}
              className="w-full mt-4 py-3 rounded-lg font-montserrat font-bold text-sm text-black transition-all hover:brightness-110"
              style={{ backgroundColor: '#aaff00' }}
            >
              Save Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RobotReportModal;
