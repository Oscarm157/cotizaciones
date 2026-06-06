import Icon from "./ui/Icon";

export default function ExpertTip({ text }: { text: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-primary flex items-center px-6 md:px-8 py-6">
      <div className="flex items-center gap-5">
        <div className="hidden md:flex shrink-0 w-12 h-12 rounded-full bg-accent/20 items-center justify-center">
          <Icon name="lightbulb" className="text-accent-light text-xl" fill />
        </div>
        <div>
          <p className="text-primary-foreground/50 text-[0.6rem] uppercase tracking-[0.2em] mb-1">Tip</p>
          <p className="text-primary-foreground text-sm md:text-base max-w-lg font-medium">{text}</p>
        </div>
      </div>
    </div>
  );
}
