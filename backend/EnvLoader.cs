namespace backend;

/// <summary>Loads a simple KEY=value <c>.env</c> file into environment variables (no shell expansion).</summary>
internal static class EnvLoader
{
    internal static void LoadFromContentRoot(string contentRootPath)
    {
        var path = Path.Combine(contentRootPath, ".env");
        if (!File.Exists(path)) return;

        foreach (var rawLine in File.ReadAllLines(path))
        {
            var line = rawLine.Trim();
            if (line.Length == 0 || line[0] == '#') continue;

            var eq = line.IndexOf('=');
            if (eq <= 0) continue;

            var key = line[..eq].Trim();
            if (key.Length == 0) continue;

            var val = line[(eq + 1)..].Trim();
            if (val.Length >= 2 &&
                ((val[0] == '"' && val[^1] == '"') || (val[0] == '\'' && val[^1] == '\'')))
            {
                val = val[1..^1];
            }

            Environment.SetEnvironmentVariable(key, val);
        }
    }
}
