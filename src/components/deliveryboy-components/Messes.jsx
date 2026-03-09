import React from 'react'

const Messes = ({dBoy}) => {


   const workingMessesData = dBoy.workingMesses


  return (
    <>

<div className="p-8">

{/* TITLE */}
<p className="text-3xl font-bold text-indigo-600">
  Joined Messes
</p>

{/* TABLE CARD */}
<div className="mt-8 bg-white border border-zinc-300 rounded-xl shadow-sm overflow-hidden">

  {/* TABLE HEADER */}
  <div className="grid grid-cols-3 px-6 py-4 bg-indigo-50 text-indigo-700 font-semibold text-sm">
    <p>Mess</p>
    <p>Address</p>
    <p>Owner</p>
  </div>

  {/* TABLE BODY */}
  {workingMessesData.map((w) => (
    <div
      key={w._id}
      className="grid grid-cols-3 px-6 py-4 border-t border-zinc-300 text-sm text-zinc-700 hover:bg-zinc-50 transition"
    >
      <p className="font-medium">{w.name}</p>
      <p className="text-zinc-600">{w.address}</p>
      <p className="font-medium">{w.owner.name}</p>
    </div>
  ))}

</div>

</div>
    
    </>
  )
}

export default Messes