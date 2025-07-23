import { Range } from 'react-range'
import { useState } from 'react'

const PriceSlider = () => {
    const STEP = 1
    const MIN = 0
    const MAX = 100
    const [values, setValues] = useState([0, 100])

    return (
        <div className="px-6 py-4 w-full">
            <Range
                step={STEP}
                min={MIN}
                max={MAX}
                values={values}
                onChange={setValues}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="h-1 w-full bg-gray-300"
                        style={{
                            ...props.style,
                            height: '6px',
                            background: 'linear-gradient(to right, #ccc, #116630, #ccc)',
                            borderRadius: '3px',
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        className="h-5 w-5 rounded-full bg-emerald-600 shadow"
                    />
                )}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${values[0]}</span>
                <span>${values[1]}</span>
            </div>
        </div>
    )
}

export default PriceSlider
