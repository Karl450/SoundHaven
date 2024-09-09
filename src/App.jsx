import iconsData from './data/iconsData';
import Icons from './components/Icons';
import './App.css';

function App() {
    return (
        <div className="iconContainer">
            {iconsData.map((icon) => (
                <Icons key={icon.id} icon={icon} />
            ))}
        </div>
    );
}

export default App;
