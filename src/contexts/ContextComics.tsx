import { createContext, useState, ReactNode } from 'react';

export interface Comic {
  id: number;
  title: string;
  variantDescription?: string;
  description: string;
  modified: Date;
  isbn?: string;
  series: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
  creators: creator[];
}

interface creator {
  name: string;
}

interface ComicList {
  comicList: Comic[];
  selectedComic: Comic;
  openDescriptionComic: (comic: Comic) => void;
  SetComicList: (comics: Comic[]) => void;
}

export const ComicContext = createContext({} as ComicList);

type ComicContextProviderProps = {
  children: ReactNode;
};

export function ComicContextProvider({ children }: ComicContextProviderProps) {
  const [comicList, setComicList] = useState([]);
  const [selectedComic, setSelectedComic] = useState<Comic>();

  function openDescriptionComic(comic: Comic) {
    setSelectedComic(comic);
  }

  function SetComicList(comics: Comic[]) {
    setComicList(comics);
  }

  return (
    <ComicContext.Provider
      value={{ comicList, selectedComic, openDescriptionComic, SetComicList }}
    >
      {children}
    </ComicContext.Provider>
  );
}
