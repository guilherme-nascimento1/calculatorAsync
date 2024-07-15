# Dockerfile para Worker C#
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia o csproj e restaura as dependências
COPY ["CalculationWorker.csproj", "./"]
RUN dotnet restore "CalculationWorker.csproj"

# Copia os arquivos do código fonte e compila o projeto
COPY . .
RUN dotnet build "CalculationWorker.csproj" -c Release -o /app/build

FROM mcr.microsoft.com/dotnet/runtime:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/build .
ENTRYPOINT ["dotnet", "CalculationWorker.dll"]
