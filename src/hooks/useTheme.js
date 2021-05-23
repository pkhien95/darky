import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react'

const STORAGE_KEY = 'darky'

export const ThemeMode = {
	DARK: 'dark',
	LIGHT: 'light'
}

const ThemeContext = createContext({
	mode: ThemeMode.LIGHT,
	setMode: () => {
	},
});

export const ThemeProvider = ({children}) => {
	const [mode, setMode] = useState(ThemeMode.LIGHT);
	
	useEffect(() => {
		async function loadData() {
			const rawValue = localStorage.getItem(STORAGE_KEY)
			if(!rawValue) {
				return
			}
			
			const jsonValue = await JSON.parse(rawValue)
			setMode(jsonValue.mode)
		}
		
		loadData()
	}, [])
	
	const setModeFn = useCallback((newMode) => {
		const value = {mode: newMode}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
		setMode(newMode)
	}, [mode])
	
	const context = useMemo(() => ({
		mode,
		setMode: setModeFn
	}), [mode, setModeFn])
	
	return (
		<ThemeContext.Provider value={context}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	return useContext(ThemeContext)
}
