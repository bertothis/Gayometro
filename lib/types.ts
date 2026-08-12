/* Tipi delle righe del database, condivisi tra API e pagine */

export type FraseRow = {
  id: string;
  normalized: string;
  original: string;
  slug: string;
  percent: number;
  verdict: string;
  motivation: string;
  flagged: boolean;
  created_at: string;
};

export type CommentoRow = {
  id: string;
  phrase_id: string;
  nickname: string;
  body: string;
  stance: "confermo" | "contesto" | null;
  is_ai: boolean;
  flagged: boolean;
  created_at: string;
};

export type QuizSessionRow = {
  id: string;
  score: number;
  band_title: string;
  paid: boolean;
  created_at: string;
};

/* Risposte delle API, usate anche dai componenti client */

export type RispostaValuta =
  | {
      stato: "ok";
      frase: Pick<
        FraseRow,
        "slug" | "original" | "percent" | "verdict" | "motivation"
      >;
    }
  | { stato: "rifiutata"; messaggio: string }
  | { stato: "errore"; messaggio: string };

export type RispostaCommento =
  | { stato: "ok"; commento: CommentoRow }
  | { stato: "rifiutato"; messaggio: string }
  | { stato: "errore"; messaggio: string };

export type RispostaQuiz =
  | { stato: "ok"; id: string }
  | { stato: "errore"; messaggio: string };
