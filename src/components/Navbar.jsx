const Navbar = () => {
  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between">
      <div className="text-xl font-bold">Tourism Guide</div>
      <div className="space-x-4">
        <a href="/" className="text-sm">Home</a>
        <a href="/community" className="text-sm">Community</a>
        <a href="/about" className="text-sm">About</a>
        <a href="/trips" className="text-sm">Trips</a>
        <a href="/login" className="text-sm">Login</a>
      </div>
    </nav>
  )
}
export default Navbar
