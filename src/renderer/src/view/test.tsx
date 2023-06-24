import { useEffect, useState } from 'react'

const Component = () => {
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get(url).then((value) => setData(value))
  }, [])
  useEffect(() => {
    axios.get(url).then((value) => setData(value))
  }, [data])
  return <div></div>
}
