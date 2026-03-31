import { useState, useEffect } from 'react';
import { Pencil, Check } from 'lucide-react';

export interface RiskCard {
  capital: string;
  lotSize: string;
  badgeLabel: string;
  badgeColor: string;
  headerBg: string;
  title: string;
  attrs: { label: string; value: string }[];
}

export interface ManagementProfile {
  cards: RiskCard[];
}

const DEFAULT_BTCUSD: RiskCard[] = [
  {
    capital: '$150',
    lotSize: '0.01 BTC lot size',
    badgeLabel: 'High risk',
    badgeColor: '#d97706',
    headerBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
    title: 'Aggressive',
    attrs: [
      { label: 'Capital exposure', value: 'High' },
      { label: 'Expected drawdown', value: 'Higher' },
      { label: 'Return potential', value: 'Maximum' },
      { label: 'Risk/return ratio', value: 'Aggressive' },
    ],
  },
  {
    capital: '$200',
    lotSize: '0.01 BTC lot size',
    badgeLabel: 'Medium risk',
    badgeColor: '#2563eb',
    headerBg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    title: 'Moderate',
    attrs: [
      { label: 'Capital exposure', value: 'Balanced' },
      { label: 'Expected drawdown', value: 'Moderate' },
      { label: 'Return potential', value: 'Optimized' },
      { label: 'Risk/return ratio', value: 'Balanced' },
    ],
  },
  {
    capital: '$500',
    lotSize: '0.01 BTC lot size',
    badgeLabel: 'Low risk',
    badgeColor: '#16a34a',
    headerBg: 'linear-gradient(135deg, #22c55e, #16a34a)',
    title: 'Conservative',
    attrs: [
      { label: 'Capital exposure', value: 'Lower' },
      { label: 'Expected drawdown', value: 'Lower' },
      { label: 'Return potential', value: 'Stable' },
      { label: 'Risk/return ratio', value: 'Conservative' },
    ],
  },
];

const TBD_CARD = (badge: string, color: string, bg: string, title: string): RiskCard => ({
  capital: 'TBD',
  lotSize: 'TBD',
  badgeLabel: badge,
  badgeColor: color,
  headerBg: bg,
  title,
  attrs: [
    { label: 'Capital exposure', value: 'TBD' },
    { label: 'Expected drawdown', value: 'TBD' },
    { label: 'Return potential', value: 'TBD' },
    { label: 'Risk/return ratio', value: 'TBD' },
  ],
});

const DEFAULT_OTHER: RiskCard[] = [
  TBD_CARD('High risk', '#d97706', 'linear-gradient(135deg, #f59e0b, #d97706)', 'Aggressive'),
  TBD_CARD('Medium risk', '#2563eb', 'linear-gradient(135deg, #3b82f6, #2563eb)', 'Moderate'),
  TBD_CARD('Low risk', '#16a34a', 'linear-gradient(135deg, #22c55e, #16a34a)', 'Conservative'),
];

const getStorageKey = (robotName: string) => `viking_mgmt_${robotName.replace(/[^a-zA-Z0-9]/g, '_')}`;

export const getManagementCards = (robotName: string): RiskCard[] => {
  try {
    const stored = localStorage.getItem(getStorageKey(robotName));
    if (stored) return JSON.parse(stored);
  } catch {}
  return robotName === 'BTC/USD' ? DEFAULT_BTCUSD : DEFAULT_OTHER;
};

export const saveManagementCards = (robotName: string, cards: RiskCard[]) => {
  localStorage.setItem(getStorageKey(robotName), JSON.stringify(cards));
};

/** Compact preview for hero — no attributes */
export const VikingManagementPreview = () => {
  const cards = getManagementCards('BTC/USD');
  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <p className="text-center text-muted text-xs font-montserrat mb-4 opacity-70 max-w-xl mx-auto">
        Each robot includes a personalized Viking Management guide — choose your risk profile directly inside each robot's specifications.
      </p>
      <p className="text-center font-montserrat font-bold text-foreground text-sm mb-3">
        Viking Management — BTC/USD Example
      </p>
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-foreground/10">
            <div className="py-3 text-center" style={{ background: card.headerBg }}>
              <p className="font-montserrat font-bold text-white text-lg">{card.capital}</p>
              <p className="text-white/80 text-[10px] font-montserrat">{card.lotSize}</p>
            </div>
            <div className="bg-card p-3 text-center">
              <span
                className="inline-block text-[10px] font-montserrat font-bold px-2 py-0.5 rounded-full mb-1.5 text-white"
                style={{ backgroundColor: card.badgeColor }}
              >
                {card.badgeLabel}
              </span>
              <p className="font-montserrat font-bold text-foreground text-sm">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-muted text-[10px] font-montserrat mt-3 opacity-60">
        This is an example for Viking BTC/USD. Each robot has its own risk profile inside its report page.
      </p>
    </div>
  );
};

/** Full panel for robot report — with attributes and optional edit mode */
export const VikingManagementPanel = ({
  robotName,
  isManageMode,
}: {
  robotName: string;
  isManageMode: boolean;
}) => {
  const [cards, setCards] = useState<RiskCard[]>(() => getManagementCards(robotName));
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<RiskCard[]>(cards);

  useEffect(() => {
    setCards(getManagementCards(robotName));
    setDraft(getManagementCards(robotName));
    setEditing(false);
  }, [robotName]);

  const startEdit = () => {
    setDraft(JSON.parse(JSON.stringify(cards)));
    setEditing(true);
  };

  const saveEdit = () => {
    setCards(draft);
    saveManagementCards(robotName, draft);
    setEditing(false);
  };

  const updateDraft = (ci: number, field: string, value: string) => {
    const next = [...draft];
    next[ci] = { ...next[ci], [field]: value };
    setDraft(next);
  };

  const updateAttr = (ci: number, ai: number, value: string) => {
    const next = [...draft];
    const attrs = [...next[ci].attrs];
    attrs[ai] = { ...attrs[ai], value };
    next[ci] = { ...next[ci], attrs };
    setDraft(next);
  };

  const displayCards = editing ? draft : cards;

  return (
    <div className="border border-foreground/10 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-muted text-[10px] font-montserrat uppercase tracking-wider">
          Viking Management — Risk Profiles
        </span>
        {isManageMode && !editing && (
          <button
            onClick={startEdit}
            className="flex items-center gap-1 text-primary text-[10px] font-montserrat font-bold hover:brightness-125 transition-all"
          >
            <Pencil size={12} /> Edit
          </button>
        )}
        {editing && (
          <button
            onClick={saveEdit}
            className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-[10px] font-montserrat font-bold hover:brightness-110 transition-all"
          >
            <Check size={12} /> Save
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {displayCards.map((card, ci) => (
          <div key={ci} className="rounded-xl overflow-hidden border border-foreground/10">
            <div className="py-3 text-center" style={{ background: card.headerBg }}>
              {editing ? (
                <>
                  <input
                    value={card.capital}
                    onChange={(e) => updateDraft(ci, 'capital', e.target.value)}
                    className="bg-white/20 text-white text-center font-montserrat font-bold text-lg w-24 mx-auto block rounded px-1 focus:outline-none"
                  />
                  <input
                    value={card.lotSize}
                    onChange={(e) => updateDraft(ci, 'lotSize', e.target.value)}
                    className="bg-white/20 text-white/80 text-center text-[10px] font-montserrat w-28 mx-auto block rounded px-1 mt-1 focus:outline-none"
                  />
                </>
              ) : (
                <>
                  <p className="font-montserrat font-bold text-white text-lg">{card.capital}</p>
                  <p className="text-white/80 text-[10px] font-montserrat">{card.lotSize}</p>
                </>
              )}
            </div>
            <div className="bg-card p-3">
              <div className="text-center mb-2">
                <span
                  className="inline-block text-[10px] font-montserrat font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: card.badgeColor }}
                >
                  {card.badgeLabel}
                </span>
              </div>
              <p className="font-montserrat font-bold text-foreground text-sm text-center mb-2">{card.title}</p>
              <div className="space-y-1.5">
                {card.attrs.map((attr, ai) => (
                  <div key={ai} className="flex justify-between text-[10px] font-montserrat">
                    <span className="text-muted">{attr.label}</span>
                    {editing ? (
                      <input
                        value={attr.value}
                        onChange={(e) => updateAttr(ci, ai, e.target.value)}
                        className="bg-foreground/5 border border-foreground/10 rounded px-1 text-foreground text-right w-20 focus:outline-none focus:border-primary"
                      />
                    ) : (
                      <span className="text-foreground font-bold">{attr.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
