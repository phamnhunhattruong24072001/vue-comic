export default {
    figures: (state) => {
        if(Object.keys(state.figures).length === 0) return [];
        
        const setFigures = state.figures
        setFigures.forEach((item) => {
            if (item.character_role === 0) {
                item.character_role = 'Nhân vật chính';
            } else if (item.character_role === 1) {
                item.character_role = 'Nhân vật phụ';
            } else {
                item.character_role = 'Phản diện';
            }
        })
        return state.figures = setFigures;
    }
}