# frozen_string_literal: true

desc 'Print dependencies'
task :deps do
  sh('ruby --version')
  sh('dprint --version')
  sh('typos --version')
end

desc 'Run linters'
task :lint do
  sh('typos . .github .vscode')
  sh('dprint check')
  sh('nixfmt --check ./*.nix')
end
