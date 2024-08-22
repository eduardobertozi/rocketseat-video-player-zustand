import Player from 'react-player'

export function Video() {
  return (
    <div className="w-full bg-zinc-950">
      <Player
        width="100%"
        heigh="100%"
        controls
        url="https://www.youtube.com/watch?v=D9ae7M7KclI&pp=ygUKcm9ja2V0c2VhdA%3D%3D"
      />
    </div>
  )
}